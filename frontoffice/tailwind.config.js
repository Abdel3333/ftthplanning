//import "./src/assets/styles/fonts.css"
module.exports = {
    purge: {
        enabled: true,
        content: [
            './src/**/*.vue',
            './public/**/*.html',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        borderRadius: {
            'none': '0',
            'sm': '0.125rem',
            DEFAULT: '0.25rem',
            'md': '0.375rem',
            'lg': '0.5rem',
            'full': '9999px',
            'large': '12px',
            'l20': '20px',
            'l30': '30px',
        },

        extend: {
            fontFamily: {
                'sans': ['MTNBrighterSans-Regular']
            },
            height: {
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '48px',
                "68p": "68px",
                "150": "150px",
                "280": "280px",
                "200": "200px",
                "256": "256px",
            },

            width: {
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '48px',
                "200": "200px",
                "240": "240px",
                "256": "256px",
                "272": "272px",
                "280": "280px",
            },
            inset: {
                'c68': '68px',
            },
            fontSize: {
                "6": "6px",
                "7": "7px",
                "8": "8px",
                "8.5": "8.5px",
                "9": "9px",
                "10": "10px",
                "11": "11px",
                "12": "12px",
                "13": "13px",
                "14": "14px",
                "15": "15px",
            },
            minHeight: {
                "26": "6.5rem",
                "171": "10.5rem",
                "144": "144px",
                "42": "42px",
                "200": "200px",
                "224": "224px",
                "256": "16rem",
                "280": "280px",
                "300": "300px",
                "312": "312px",
                "320": "320px",
                "328": "328px",
                "360": "360px",
                "400": "400px",
                "442": "442px",
                "504": "504px",
                "596": "596px",
                "600": "600px",
            },
            maxHeight: {
                "26": "6.5rem",
                "171": "10.5rem",
                "144": "144px",
                "42": "42px",
                "200": "200px",
                "256": "16rem",
                "280": "280px",
                "300": "300px",
                "312": "312px",
                "328": "328px",
                "360": "360px",
                "400": "400px",
                "442": "442px",
                "460": "460px",
                "596": "596px",
            },
            minWidth: {
                "0": "0",
                "22": "90px",
                "128": "128px",
                "144": "144px",
                "200": "200px",
                "256": "16rem",
                "280": "280px",
                "300": "300px",
                "312": "312px",
                "400": "400px",
                "432": "432px",
                "328": "328px",
                "360": "360px",
                "800": "800px",
            },
            maxWidth: {
                "26": "6.5rem",
                "171": "10.5rem",
                "144": "144px",
                "128": "128px",
                "160": "160px",
                "200": "200px",
                "256": "16rem",
                "280": "280px",
                "300": "300px",
                "312": "312px",
                "316": "316px",
                "328": "328px",
                "360": "360px",
                "365": "365px",
                "400": "400px",
                "432": "432px",
                "442": "442px",
                "596": "596px",
                "800": "800px",
            },
            colors: {
                yellowLighter: {
                    simple: "#FDE997",
                    hover: "#FFF4C6",
                    active: "#FFF4C0"
                },
                yellowNormal: {
                    simple: "#FECC00",
                    hover: "#F2C200",
                    active: "#E6B800"
                },
                yelloDark: "#665200",

                blueLighter: {
                    simple: "#55CEFF",
                    active: "#85D2FF",
                    hover: "#D6FCFF"
                },
                blueDark: "#0C293B",

                inkLighter: {
                    simple: "#BAC7D5",
                    hover: "#A6B6C8",
                    active: "#94A8BE"
                },
                inkLight: {
                    simple: "#7F91A8",
                    hover: "#6D819C",
                    active: "#5F738C"
                },
                inkNormal: {
                    simple: "#46515E",
                    hover: "#3F4854",
                    active: "#38404B"
                },
                inkDark: "#171B1E",

                saltGrey: "#F4F4F4",
                greyscales: "#4D4C4C",
                blueNormal: "#1E6793",
                blueActive: "#175073",
                innerBorder: "#CCCCCC",
                borderColor: "#BAC7D5",
                stepper: "#E0E9F2",
                tint70: "#C6D6EC",
                kkiapayRed: "#F11C33",
                gray5: "#E0E0E0",
                f2: "#F2F2F2",
                badgeActive: "#E6FAEE",
                greenStep: "#28BF28",
                green2: "#27AE60",
                cartCard: "#7F7F7F",
                bordercol: "#D7E2ED",
                statusBg: "#EEF2FA",
            },
        },
    },
    variants: {
        extend: {
            userSelect: ['hover', 'focus'],
            backgroundColor: ['checked'],
            borderColor: ['checked'],
            borderWidth: ['hover', 'focus', 'checked'],
        },
        scrollbar: ['dark', 'rounded']

    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: 'class',
        }),
        require('tailwind-scrollbar'),
    ],
}