# Yafet Premium Bedding Catalog

A high-end, localized bedding catalog for the Ethiopian market, featuring luxury materials like Mulberry Silk and Egyptian Cotton.

## Project Overview

- **Purpose**: Provide a curated shopping experience for premium bedding in Ethiopia.
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4.
- **Backend**: Supabase (PostgreSQL) for product data and image storage.
- **i18n**: `next-intl` for English (en) and Amharic (am) support.
- **Design Aesthetic**: Luxury Minimalist (Serif headings, Sans-serif body, `luxury-gold` accents).

## Architecture

- `src/app/[locale]`: Main application routes with localization support.
- `src/components`: Reusable UI components (Nav, Footer, FAB, etc.).
- `src/i18n`: Internationalization configuration and routing.
- `src/lib`: Core utilities, including the Supabase client (`supabase.ts`).
- `messages/`: JSON files for localized strings (`en.json`, `am.json`).
- `public/`: Static assets and images.

## Development & Build

### Key Commands
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint for code quality checks.

### Environment Variables
The following environment variables are required (stored in `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

## Development Conventions

### Localization (i18n)
- The project uses `next-intl`. New routes should be placed within the `src/app/[locale]` directory.
- While `next-intl` is the standard, some legacy pages might use internal `translations` objects. New features should prefer `next-intl` hooks (`useTranslations`) and `messages/*.json`.

### Styling
- Use **Tailwind CSS 4** for all styling.
- Follow the "Luxury Minimalist" design language:
  - **Headings**: Serif fonts (e.g., `font-serif`).
  - **Body**: Sans-serif fonts.
  - **Accents**: Use the `luxury-gold` color for highlights and calls to action.
  - **Spacing**: Use generous white space to maintain a premium feel.

### Database
- Interactions with Supabase should go through the client exported from `@/lib/supabase`.
- Follow the schema defined in `PLANNING.md` for products.

### Next.js 16 Warning
- This project uses Next.js 16 (experimental/edge). Be aware of potential breaking changes and refer to `AGENTS.md` for specific instructions regarding this version.

## Key Files
- `src/app/[locale]/page.tsx`: Home page implementation.
- `src/app/[locale]/catalog/page.tsx`: Product grid.
- `src/lib/supabase.ts`: Supabase client initialization.
- `PLANNING.md`: Original project roadmap and data structures.
- `AGENTS.md`: Crucial warnings regarding the Next.js version.
