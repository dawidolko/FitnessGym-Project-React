# FitnessGym

> 🏋️ **A gym site with a shop attached** — React, scroll-driven sections and a cart that survives a refresh

**FitnessGym** is a marketing site for a gym that happens to sell things. Seven pages — home, about, shop, cart, blog, FAQ and contact — with scroll-triggered sections, an animated counter, a testimonial slider and a map. The shop keeps its cart in `localStorage`, so closing the tab does not empty it.

It is a static build published to GitHub Pages: no backend, no accounts, and images converted to WebP by a script before the build runs.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.69-CC6699?logo=sass&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-0055FF?logo=framer&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-222222?logo=githubpages&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Live:** [fitnessgym.dawidolko.pl](https://fitnessgym.dawidolko.pl)

---

## 🎯 Key Features

- **A cart that survives a refresh** — `ShopContext` mirrors the cart into `localStorage` on every change and reads it back on mount, so a closed tab is not a lost basket.
- **Scroll as a narrative device** — `react-scrollama` and `react-intersection-observer` drive the sections; the counter starts when it enters the viewport rather than on page load.
- **Page transitions, not page jumps** — Framer Motion animates between routes, and scroll position is restored per route.
- **Forms that validate before they submit** — Formik with Yup schemas, with input masks on the fields that need them.
- **Images converted before the build** — `npm run optimize:images` runs sharp over `src/assets` and writes WebP, so the deployed bundle ships the smaller format.
- **Seven real pages** — home, about, shop, cart, blog, FAQ and contact, plus a 404, all routed client-side.
- **Responsive throughout** — a desktop grid collapses to a single column, with the navigation becoming a panel.

---

## 🛠️ Technology Stack

| Technology                    | Version | Role                                                   |
| ----------------------------- | ------- | ------------------------------------------------------ |
| **React**                     | 18      | Component model; context for the cart.                 |
| **React Router**              | 6       | Routing and scroll restoration.                        |
| **Sass**                      | 1.69    | Styles, one partial per section.                       |
| **Framer Motion**             | 10      | Page transitions and reveal animations.                |
| **react-scrollama**           | 2.3     | Scroll-driven storytelling sections.                   |
| **Formik + Yup**              | 2 / 1   | Forms and validation.                                  |
| **react-slick**               | 0.29    | Testimonial and gallery sliders.                       |
| **sharp** (dev)               | —       | WebP conversion before the build.                      |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### 1. Clone the repository

```bash
git clone https://github.com/dawidolko/FitnessGym-Project-React.git
cd FitnessGym-Project-React
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run

```bash
npm start              # development server at http://localhost:3000
npm run optimize:images # convert src/assets to WebP
npm run build          # production build into build/
npm run deploy         # publish build/ to GitHub Pages
```

---

## 📁 Project Structure

```
FitnessGym-Project-React/
├── public/                    # index.html, favicon, CNAME
├── scripts/
│   └── optimize-images.js     # sharp → WebP over src/assets
└── src/
    ├── App.js                 # routes and layout
    ├── global.scss            # tokens, reset, shared rules
    ├── pages/                 # Home, About, Shop, Cart, Blog, Faq, Contact
    └── components/
        ├── ShopContext/       # cart state mirrored into localStorage
        ├── ShopContent/       # product data and the shop grid
        ├── CartContent/       # cart list and totals
        ├── Hero/  AboutUs/  Team/  Pricing/  Testimonials/
        ├── Counter/           # animated figures, triggered on scroll
        ├── Accordion/  Map/  Modal/  Navbar/  Footer/
        └── AnimatedPage/      # route transition wrapper
```

---

## 📄 License

MIT © [Dawid Olko](https://dawidolko.pl)
