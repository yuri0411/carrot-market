import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div className="bg-slate-400 xl:place-content-center py-20 px-10 grid gap-10 xl:grid-cols-3 lg:grid-cols-2 min-h-screen">
            <div className="bg-white flex flex-col justify-between p-6 rounded-3xl shadow-xl">
                <span className="font-semibold text-3xl">Select Item</span>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="flex justify-between my-2 p-1 odd:bg-gray-100"
                    >
                        <span className="text-gray-500">Grey Chair</span>
                        <span className="font-semibold">$19</span>
                    </div>
                ))}
                <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
                    <span>Total</span>
                    <span className="font-semibold">$38</span>
                </div>
                <button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto hover:bg-teal-500 active:bg-yellow-500 focus:bg-red-500">
                    Checkout
                </button>
            </div>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden group">
                <div className="portrait:bg-indigo-600 landscape:bg-teal-500 p-10 pb-14 xl:pb-40">
                    <span className="text-white text-2xl">Profile</span>
                </div>
                <div className="rounded-3xl p-6 bg-white relative -top-5">
                    <div className="flex relative -top-16 items-end justify-between">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500 ">
                                Orders
                            </span>
                            <span className="font-medium">340</span>
                        </div>
                        <div className="h-24 w-24 bg-gray-400 rounded-full group-hover:bg-red-300 transition-colors" />
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500 ">
                                Spent
                            </span>
                            <span className="font-medium">$2,310</span>
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center -mt-10 -mb-5">
                        <span className="text-lg font-medium">Tony Molly</span>
                        <span className="text-sm text-gray-500">미국</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-xl lg:col-span-2 xl:col-span-1">
                <div className="flex mb-5 justify-between items-center">
                    <span>⬅️</span>
                    <div className="space-x-3">
                        <span>🌟 4.9</span>
                        <span className="shadow-xl p-2 rounded-md ">💖</span>
                    </div>
                </div>
                <div className="bg-zinc-400 h-72 " />
                <div className="flex flex-col">
                    <span className="font-medium text-xl">Swoon Lounge</span>
                    <span className="text-xs text-gray-500">Chair</span>
                    <div className="mt-3 mb-5 flex justify-between items-center">
                        <div className="space-x-2">
                            <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition" />
                            <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
                            <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition" />
                        </div>
                        <div className="flex items-center space-x-5">
                            <button className="bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500 rounded-lg">
                                -
                            </button>
                            <span>1</span>
                            <button className="bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500 rounded-lg">
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium text-2xl">$450</span>
                        <button className="bg-blue-500 p-2 px-5 text-xs text-center text-white rounded-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
