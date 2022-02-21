module.exports = {
    content: [
        './pages/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class', // media 브라우저 모드 따라감
    plugins: [require('@tailwindcss/forms')],
}
