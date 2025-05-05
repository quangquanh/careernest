/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
const flowbite = require("flowbite-react/tailwind");

export default {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    theme: {
        // nếu custom smaller breakpoint thì dùng cách này (không thêm được vào extend)
        screens: {
            'xs': '480px',
            ...defaultTheme.screens, // chỉ ghi đè mỗi xs breakpoint
        },
        extend: {
            fontFamily: {
                sora: ["Sora", 'sans-serif'],
            },
            colors: {
                primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
                coffee: {
                    200: '#C89F94',
                }
            },
            backgroundColor: {
                'CE': '#CED9D9',
                'E7': '#E7ECEC',
                'overlay-30': 'rgba(0,0,0,0.3)',
            },
            boxShadow: {
                md: "6px 6px 16px 0 rgba(0, 0, 0, 0.25),-4px -4px 12px 0 rgba(255, 255, 255, 0.3);",
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                        visibility: 'visible'
                    },
                    '100%': {
                        transform: 'translateY(100%)',
                        opacity: 0,
                        visibility: 'hidden'
                    },
                },
                fadeIn: {
                    from: { opacity: 0 }, to: { opacity: 1 },
                },
                slideLeft: {
                    '0%': {
                        '-webkit-transform': 'translateX(500px)',
                        transform: 'translateX(500px)'
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0)',
                        transform: 'translateX(0)'
                    }
                },
                slideRight: {
                    '0%': {
                        '-webkit-transform': 'translateX(-500px)',
                        transform: 'translateX(-500px)'
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0)',
                        transform: 'translateX(0)'
                    }
                },
                rotateCenter: {
                    '0%': {
                        '-webkit-transform': 'rotate(0)',
                        transform: 'rotate(0)',
                        'border-radius': '99999px',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg)',
                        transform: 'rotate(360deg)'
                    }
                },
                rotatePause: {
                    '0%': {
                        '-webkit-transform': 'rotate(360deg)',
                        transform: 'rotate(360deg)',
                        'border-radius': '99999px',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(0)',
                        transform: 'rotate(0)'
                    }
                },
                'scale-up-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.2);',
                        transform: 'scale(1.2);'
                    }
                },
                'scale-down-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1.2);',
                        transform: 'scale(1.2);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);'
                    }
                },
            },
            animation: {
                slideUp: 'slideUp 0.8s ease-in-out',
                slideDown: 'slideDown 0.8s ease-in-out',
                slideRight: 'slideRight 0.8s ease-in-out',
                slideLeft: 'slideLeft 0.8s ease-in-out',
                fadeIn: 'fadeIn 0.5s ease-in-out ',
                rotateCenter: 'rotateCenter 8s linear infinite',
                rotatePause: 'rotatePause 0.3s linear 2 both',
                'scale-up-image': 'scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'scale-down-image': 'scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            },
            backgroundImage: {
                'slider-bg': `url('/slider-img.jpg')`,
                'bg-parallax': `url('/parallax.jpg')`,
            }
        },
        plugins: [
            flowbite.plugin(),
        ],
    }
}