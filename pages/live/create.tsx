import type { NextPage } from 'next'
import Layout from '../../components/layout'
import Input from '../../components/input'
import Textarea from '../../components/textarea'

const Create: NextPage = () => {
    return (
        <Layout canGoBack>
            <div className="space-y-5 px-4">
                <div>
                    <Input
                        name="name"
                        label="Name"
                        kind="text"
                        type="text"
                        required={true}
                    />
                </div>
                <div>
                    <Input
                        name={'price'}
                        label={'Price'}
                        kind={'price'}
                        type={'text'}
                        required={false}
                    />
                </div>
                <div>
                    <Textarea name="description" label="Description" />
                </div>
                <button className=" w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
                    Go live
                </button>
            </div>
        </Layout>
    )
}

export default Create
