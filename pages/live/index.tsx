import type { NextPage } from 'next'
import Layout from '../../components/layout'
import FloatingBtn from '../../components/floatingBtn'

const Live: NextPage = () => {
    return (
        <Layout title="라이브" hasTabBar>
            <div className="space-y-4 divide-y-2">
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <div className="pt-4 px-4" key={i}>
                        <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
                        <h3 className="text-gray-700 text-lg mt-2">
                            Let&apos;s try potatos
                        </h3>
                    </div>
                ))}
                <FloatingBtn type={'live'} url={`/`} />
            </div>
        </Layout>
    )
}

export default Live
