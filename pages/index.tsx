import type { NextPage } from 'next'
import Layout from '../components/layout'
import ProductItem from '../components/productItem'
import FloatingBtn from '../components/floatingBtn'

const Home: NextPage = () => {
    return (
        <Layout title={'home'} hasTabBar>
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
