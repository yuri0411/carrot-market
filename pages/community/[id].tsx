import type { NextPage } from 'next'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Answer, Post, User } from '@prisma/client'
import Link from 'next/link'
import useMutation from '@libs/client/useMutation'
import { cls } from '@libs/client/utils'
import Textarea from '@components/textarea'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import answer from '../api/posts/[id]/answer'

interface AnswerWithUser extends Answer {
    user: User
}

interface PostWithUser extends Post {
    user: User
    _count: {
        answers: number
        wondering: number
    }
    answers: AnswerWithUser[]
}
interface communityPostResponse {
    ok: boolean
    post: PostWithUser
    isWondering: boolean
}

interface AnswerForm {
    answer: string
}

interface AnswerResponse {
    ok: boolean
    response: Answer
}

const CommunityPostDetail: NextPage = () => {
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<AnswerForm>()
    const { data, mutate } = useSWR<communityPostResponse>(
        router.query.id ? `/api/posts/${router.query.id}` : null,
    )
    const [wonder, { loading }] = useMutation(
        `/api/posts/${router.query.id}/wonder`,
    )
    const [sendAnswer, { data: answerData, loading: answerLoading }] =
        useMutation<AnswerResponse>(`/api/posts/${router.query.id}/answer`)

    const onWonderClick = () => {
        if (!data) return
        mutate(
            {
                ...data,
                post: {
                    ...data?.post,
                    _count: {
                        ...data?.post?._count,
                        wondering: data.isWondering
                            ? data?.post?._count.wondering - 1
                            : data?.post?._count.wondering + 1,
                    },
                },
                isWondering: !data?.isWondering,
            },
            false,
        )
        if (!loading) {
            wonder({})
        }
    }

    const onValid = (form: AnswerForm) => {
        if (answerLoading) return
        sendAnswer(form)
    }
    useEffect(() => {
        if (answerData && answerData.ok) {
            reset()
            mutate()
        }
    }, [answerData, reset, mutate])

    // todo data가 앖을 때 404페이지로 redirect하기
    return (
        <Layout canGoBack>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ml-4">
                동네질문
            </span>
            <Link href={`/users/profiles/${data?.post?.user?.id}`}>
                <a className="flex mb-3 px-4 items-center space-x-3 py-3 border-b cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-slate-300 " />
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            {data?.post?.user?.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                            View profile &rarr;
                        </p>
                    </div>
                </a>
            </Link>
            <div>
                <div className="mt-2 text-gray-700 px-4 ">
                    <span className="text-orange-500 font-medium">Q.</span>
                    &nbsp;
                    {data?.post?.question}
                </div>
                <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[1.5px] w-full px-4">
                    <button
                        onClick={onWonderClick}
                        className={cls(
                            'flex space-x-2 items-center text-sm',
                            data?.isWondering ? 'text-teal-500' : '',
                        )}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>궁금해요 {data?.post?._count?.wondering}</span>
                    </button>
                    <span className="flex space-x-2 items-center text-sm">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        <span>답변 {data?.post?._count?.answers}</span>
                    </span>
                </div>
            </div>
            <div className="px-4 my-5 space-y-5">
                {data?.post?.answers?.map((answer) => (
                    <div
                        key={answer.id}
                        className="flex items-start space-x-3 "
                    >
                        <div className="w-8 h-8 bg-slate-300 rounded-full" />
                        <div>
                            <span className="text-sm block font-medium text-gray-700">
                                {answer.user.name}
                            </span>
                            <span className="text-xs text-gray-500 block">
                                {answer.createAt}
                            </span>
                            <p className="text-gray-700 mt-2">
                                {answer.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onValid)} className="px-4">
                <Textarea
                    name="description"
                    placeholder="Answer this question!"
                    required
                    register={register('answer', {
                        required: true,
                        minLength: 5,
                    })}
                />

                <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
                    {answerLoading ? 'Loading...' : 'Reply'}
                </button>
            </form>
        </Layout>
    )
}

export default CommunityPostDetail
