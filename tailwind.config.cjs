/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#A0C3D2",
                secondary: "#cc939e",
            },
        },
    },
    plugins: [],
};
