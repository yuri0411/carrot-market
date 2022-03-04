import type { NextPage } from 'next'
import Layout from '../components/layout'
import ProductItem from '../components/productItem'
import FloatingBtn from '../components/floatingBtn'
import useUser from '@libs/client/useUser'
import Head from 'next/head'
import useSWR from 'swr'
import { Product } from '@prisma/client'
import Link from 'next/link'

interface ProductWithCount extends Product {
    _count: {
        favs: number
    }
}

interface ProductResponse {
    ok: boolean
    products: ProductWithCount[]
}

const Home: NextPage = () => {
    const { user, isLoading } = useUser()
    const { data } = useSWR<ProductResponse>('/api/products')
    console.log(data)
    return (
        <Layout title={'home'} hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className="flex flex-col">
                {data?.products?.map((product) => (
                    <Link key={product?.id} href={`/products/${product?.id}`}>
                        <a>
                            <ProductItem
                                id={product.id}
                                title={product.name}
                                price={product.price}
                                comments={1}
                                hearts={product._count.favs}
                            />
                        </a>
                    </Link>
                ))}
            </div>
            <FloatingBtn type={'plus'} url={`/products/upload`} />
        </Layout>
    )
}

export default Home
