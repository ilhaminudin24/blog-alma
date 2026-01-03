# Ruang Cerita Alma

A personal blog and storytelling platform built with **Next.js 16**, **Sanity CMS**, and **Tailwind CSS**. This project features fully dynamic content management, dual language support (Indonesian & English), and a custom-designed UI.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS**: [Sanity v5](https://www.sanity.io/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: Zustand
- **Icons**: Lucide React

## ✨ Features

- **Dual Language Support**: Seamless switching between Indonesian (ID) and English (EN) content.
- **Dynamic CMS Integration**:
  - **Blog Posts**: Rich text editing with Portable Text.
  - **Categories**: Dynamic category management with custom icons, colors, and descriptions.
  - **Page Configuration**: Fully configurable Hero section, About page, and Footer directly from Sanity.
  - **Site Settings**: Global settings for site title, SEO descriptions, and social media links.
- **Interactive UI**:
  - Custom Hero section with animated elements.
  - "Ask Alma" Q&A feature integration.
  - Responsive layout optimized for readability across devices.
  - Custom typography and cute aesthetic.
- **Modern Tooling**:
  - React 19 features.
  - Strict TypeScript setup.
  - Automated migration scripts for content updates.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (Recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd blog-alma
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

   Create a `.env.local` file in the root directory and add your Sanity credentials:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   SANITY_API_TOKEN=your_write_token # Required for running migration scripts
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### CMS (Sanity Studio)

Content is managed via Sanity Studio which is embedded directly in the application.

- Access the Studio at: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📂 Project Structure

```
.
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # Reusable React components
│   ├── sanity/           # Sanity configuration, client, and schemas
│   │   ├── schemaTypes/  # Content schemas (post, category, about, siteSettings, etc.)
│   │   └── lib/          # Sanity client & GROQ queries
│   └── i18n/             # Internationalization configuration
├── scripts/              # Migration and data seeding scripts
├── messages/             # Localization JSON files (en.json, id.json)
└── public/               # Static assets and images
```

## 📜 Scripts

The `scripts` folder contains utilities for data migration and initial setup:

- `seedSiteSettings.ts`: Initializes default site settings in the CMS.
- `migrate-*.mjs`: Collection of scripts to migrate data structures, import content, or update schema fields in Sanity.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.
