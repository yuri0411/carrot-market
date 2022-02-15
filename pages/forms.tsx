import { FieldErrors, useForm } from 'react-hook-form'

interface LoginForm {
    username: string
    password: string
    email: string
    errors?: string
}
const Forms = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<LoginForm>({
        mode: 'onChange',
    })
    const onValid = (data: LoginForm) => {
        console.log('valid', data)
        setError('errors', { message: 'Backed is offline sorry.' })
        reset()
    }
    const onInvalid = (errors: FieldErrors) => {
        console.log('invalid', errors)
    }
    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <input
                {...register('username', {
                    required: 'Username is required',
                    minLength: {
                        message: 'The username should be longer than 4 chars.',
                        value: 5,
                    },
                })}
                type="text"
                placeholder="Username"
            />
            {errors.username?.message}
            <input
                {...register('email', {
                    required: 'Email is required',
                    validate: {
                        notGmail: (value) =>
                            !value.includes('@gmail.com') ||
                            'Gmail is not allowed',
                    },
                })}
                type="email"
                placeholder="Email"
            />
            {errors.email?.message}
            <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Password"
            />
            <input type="submit" value="Create Account" />
            {errors.errors?.message}
        </form>
    )
}

export default Forms
