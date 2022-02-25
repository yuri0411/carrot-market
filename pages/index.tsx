import type { NextPage } from 'next'
import Layout from '../components/layout'
import ProductItem from '../components/productItem'
import FloatingBtn from '../components/floatingBtn'
import useUser from '@libs/client/useUser'
import Head from 'next/head'

const Home: NextPage = () => {
    const user = useUser()
    console.log(user)
    return (
        <Layout title={'home'} hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className="flex flex-col">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <ProductItem key={i} />
                ))}
            </div>
            <FloatingBtn type={'plus'} />
        </Layout>
    )
}

export default Home
