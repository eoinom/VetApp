# VetApp

[![Netlify Status](https://api.netlify.com/api/v1/badges/033e9037-2f97-46ed-8b78-721cc04d34d7/deploy-status)](https://app.netlify.com/sites/vetapp-signup/deploys)

A client-side rendered Nuxt 4 application that allows users to sign up for a product using the [Nordhealth Design System (VET theme)](https://nordhealth.design). The app demonstrates reusable web-components, validation, transitions, testing, and is ready for deployment on Netlify.

---

## 🚀 Features

- ✅ Built with **Nuxt 4** in client-only mode (`ssr: false`)
- 🎨 Styled using the **Nordhealth Design System** (VET theme)
- 📅 Signup form with:
  - Email & password validation
  - Show/hide password toggle
  - Opt-in for marketing

- 🔒 Form validation and error handling
- 🌐 SEO metadata with `useSeoMeta()`
- 💡 Page transitions
- 🔀 State reset and success confirmation page
- 🧰 **Unit tests** with Vitest
- 🔍 Linting with ESLint + Prettier
- ☁️ Deployable to **Netlify**

---

## 🧱 Project Structure

```
.
├── components/
│   └── SignupForm.vue
├── composables/
│   └── useForm.ts
│   └── usePasswordToggle.ts
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   └── success.vue
├── public/
├── tests/
│   ├── setup.ts
├── nuxt.config.ts
└── netlify.toml
```

---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Start Development Server

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## 🧲 Testing

### Unit Tests (Vitest)

```bash
# npm
npm run test

# pnpm
pnpm test

# yarn
yarn test

# bun
bun run test
```

---

## 🧹 Linting & Formatting

```bash
npm run lint         # Check lint issues
npm run lint:fix     # Auto-fix lint issues
```

---

## ☁️ Deployment (Netlify)

This app is optimized for static hosting.

### Build for Production

```bash
npm run generate
```

### Preview Locally

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview

# or:
npx serve .output/public
```

### Netlify Settings

- **Build command:** `npm run generate`
- **Publish directory:** `dist`

### Redirects (via `netlify.toml`)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🧐 Tech Stack

- [Nuxt 4](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [Nordhealth Design System](https://nordhealth.design)
- [Vitest](https://vitest.dev)
- [Netlify](https://netlify.com)

---

## 🔗 Live Demo

Deployed on Netlify: [https://vetapp-signup.netlify.app/](https://vetapp-signup.netlify.app/)

---

## ✨ Author

Built by Eoin O'Malley.
