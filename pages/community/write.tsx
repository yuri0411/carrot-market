import type { NextPage } from 'next'
import Layout from '@components/layout'
import { useForm } from 'react-hook-form'
import Textarea from '@components/textarea'
import useMutation from '@libs/client/useMutation'
import { useEffect } from 'react'
import { Post } from '@prisma/client'
import { useRouter } from 'next/router'
import useCoords from '@libs/client/useCoords'

interface WriteFrom {
    question: string
}

interface WriteResponse {
    ok: boolean
    post: Post
}
const Write: NextPage = () => {
    const router = useRouter()
    const { latitude, longitude } = useCoords()
    const { register, handleSubmit } = useForm<WriteFrom>()
    const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts')
    const onValid = (data: WriteFrom) => {
        if (loading) return
        post({ ...data, latitude, longitude })
    }
    useEffect(() => {
        if (data && data.ok) {
            router.push(`/community/${data.post.id}`)
        }
    }, [data, router])
    return (
        <Layout canGoBack title="Write Post">
            <form className="px-4" onSubmit={handleSubmit(onValid)}>
                <Textarea
                    name="question"
                    register={register('question', {
                        required: true,
                        minLength: 5,
                    })}
                    placeholder="Ask a question!"
                />

                <button className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </Layout>
    )
}

export default Write
