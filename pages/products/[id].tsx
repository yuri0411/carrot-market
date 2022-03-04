import type { NextPage } from 'next'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import Link from 'next/link'
import { Product, User } from '@prisma/client'
import useMutation from '@libs/client/useMutation'
import { cls } from '@libs/client/utils'
import useUser from '@libs/client/useUser'

interface ProductWithUser extends Product {
    user: User
}
interface ItemDetailResponse {
    ok: boolean
    product: ProductWithUser
    relatedProducts: Product[]
    isLiked: boolean
}
const ItemDetail: NextPage = () => {
    const { user, isLoading } = useUser()
    const router = useRouter()
    const { mutate } = useSWRConfig()
    const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
        router.query.id ? `/api/products/${router.query.id}` : null,
    )
    const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`)

    const onFavClick = () => {
        if (!data) return
        boundMutate(
            (prev) =>
                prev && {
                    ...prev,
                    isLiked: !prev.isLiked,
                },
            false,
        )
        // mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false) // unbound mutate 데이터가 컴포넌트 내부의 없을 경우 사용
        toggleFav({})
    }
    return (
        <Layout canGoBack>
            {!data ? (
                <div className="flex justify-center">Loading...</div>
            ) : (
                <div className="px-4 py-10">
                    <div className="mb-8">
                        <div className="h-96 bg-slate-300" />
                        <div className="flex items-center space-x-3 py-3 border-t border-b cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-slate-300 " />
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    {data?.product?.user?.name}
                                </p>
                                <Link
                                    href={`/users/profiles/${data?.product?.user?.id}`}
                                >
                                    <a className="text-xs font-medium text-gray-500">
                                        View profile &rarr;
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {data?.product?.name}
                            </h1>
                            <span className="block text-3xl mt-3 text-gray-900">
                                {data?.product?.price}
                            </span>
                            <p className="text-base my-6 text-gray-700">
                                {data?.product?.description}
                            </p>
                            <div className="flex items-center justify-between space-x-2">
                                <button className="flex-1 bg-orange-500 text-white py-3 rounded-md font-medium focus:outline-none hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
                                    Talk to seller
                                </button>
                                <button
                                    onClick={onFavClick}
                                    className={cls(
                                        'p-3 flex items-center justify-center hover:text-orange-500 hover:bg-orange-50 rounded-md ',
                                        data?.isLiked
                                            ? 'text-orange-500'
                                            : 'text-gray-400',
                                    )}
                                >
                                    {data?.isLiked ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6 "
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Similar items
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {data?.relatedProducts?.map((product) => (
                                <Link
                                    href={`/products/${product.id}`}
                                    key={product.id}
                                >
                                    <a>
                                        <div>
                                            <div className="h-56 w-full mb-4 bg-slate-300 rounded-md " />
                                            <h3 className="text-gray-700">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-900">
                                                {product.price}
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default ItemDetail
