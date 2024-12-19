/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-default": "#caf0f8",
        "rich-black-300": "#001A2C",
        "rich-black-500": "#001523",
        "rich-black-700": "#00111C",
        "purssian-blue-200": "#00406C",
        "purssian-blue-300": "#003A61",
        "purssian-blue-400": "#003356",
        "purssian-blue-500": "#002E4E",
        "purssian-blue-600": "#002945",
        "purssian-blue-700": "#00253E",
        "purssian-blue-800": "#002137",
        "dark-washed-azure": "#0073e6",
      },
    },
  },
  plugins: [],
};
