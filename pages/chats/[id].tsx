import type { NextPage } from 'next'

const ChatDetail: NextPage = () => {
    return (
        <div className="px-4 py-10 space-y-4">
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                    Hi how much are you selling them for?
                </div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-slate-300" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                    I want ￦20,000
                </div>
            </div>
            <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300" />
                <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                    미쳤어
                </div>
            </div>
            <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0">
                <div className="flex items-center">
                    <input
                        type="text"
                        className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                    />
                    <div className="absolute inset-y-2 flex right-2">
                        <button className="cursor-pointer flex items-center bg-orange-500 rounded-full px-3 text-sm text-white focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDetail
