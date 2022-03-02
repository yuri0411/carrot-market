import type { NextPage } from 'next'
import Layout from '../../components/layout'
import { useForm } from 'react-hook-form'
import Input from '@components/input'
import Textarea from '@components/textarea'
import useMutation from '@libs/client/useMutation'
import { useEffect } from 'react'
import { Product } from '@prisma/client'
import { useRouter } from 'next/router'
import { route } from 'next/dist/server/router'

interface UploadProductForm {
    name: string
    price: number
    description: string
}

interface UploadProductMutation {
    ok: boolean
    product: Product
}

const Upload: NextPage = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm<UploadProductForm>()
    const [uploadProduct, { loading, data }] =
        useMutation<UploadProductMutation>('/api/products')
    const onValid = (data: UploadProductForm) => {
        if (loading) return
        uploadProduct(data)
    }
    useEffect(() => {
        if (data?.ok) {
            router.push(`/products/${data.product.id}`)
        }
    }, [data, router])
    return (
        <Layout canGoBack>
            <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
                <div className="px-4 space-y-5">
                    <div>
                        <label className="cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 py-6 h-48 rounded-md text-gray-600 hover:text-orange-500 hover:border-orange-500">
                            <svg
                                className="h-12 w-12"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <input className="hidden" type="file" />
                        </label>
                    </div>
                    <div>
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            kind="text"
                            required
                            register={register('name', { required: true })}
                        />
                    </div>
                    <div>
                        <Input
                            name="price"
                            label="Price"
                            type="text"
                            kind="price"
                            required
                            register={register('price', { required: true })}
                        />
                    </div>
                    <div>
                        <Textarea
                            name="description"
                            label="Description"
                            register={register('description', {
                                required: true,
                            })}
                            required
                        />
                    </div>
                    <button className=" w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
                        {loading ? 'Loading...' : 'Upload item'}
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default Upload
