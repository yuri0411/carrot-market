import { UseFormRegisterReturn } from 'react-hook-form'

interface TextareaProps {
    name?: string
    label?: string
    register?: UseFormRegisterReturn
    [key: string]: any
}

const Textarea = ({ name, label, register, ...rest }: TextareaProps) => {
    return (
        <>
            <label
                htmlFor={name}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <textarea
                id={name}
                className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
                rows={4}
                {...rest}
                {...register}
            />
        </>
    )
}

export default Textarea
