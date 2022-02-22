import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
    name: string
    label: string
    kind?: 'text' | 'phone' | 'price'
    type: string
    register?: UseFormRegisterReturn
    required: boolean
}

const Input = ({
    name,
    label,
    kind,
    type = 'text',
    register,
    required,
}: InputProps) => {
    return (
        <>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                {kind === 'text' ? (
                    <input
                        id={name}
                        type={type}
                        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        required={required}
                        {...register}
                    />
                ) : null}
                {kind === 'phone' ? (
                    <div className="flex rounded-md shadow-sm">
                        <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
                            +82
                        </span>
                        <input
                            id={name}
                            type={type}
                            className="py-2 px-4 border border-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required={required}
                            {...register}
                        />
                    </div>
                ) : null}
                {kind === 'price' ? (
                    <div className="rounded-md relative flex  items-center shadow-sm">
                        <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                            id={name}
                            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            type={type}
                            placeholder="0.00"
                            required={required}
                            {...register}
                        />
                        <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
                            <span className="text-gray-500">USD</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default Input
