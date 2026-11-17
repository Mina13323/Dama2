This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## DAMA site architecture and deployment notes

The site is a bilingual Next.js static export, intended for GitHub Pages. It includes the home page, About, projects and individual project pages, Living, Our Impact, news and articles, careers, contact, privacy and terms. The homepage features a project overview and links to the editorial sections. Project content is maintained in `src/content/projects.ts`, and articles in `src/content/news.ts`.

### Review before publishing

- Existing project, company, contact and news data was carried over from the original site and has **not been independently verified**. In particular, the original homepage said Rawasin has 177 units, while the project data says 480; the homepage figure was removed pending confirmation. Review all figures, project names, contact details, imagery, dates, claims and legal text before publishing.
- Madinet Masr's innovation products, financial details and named developments were deliberately not copied. Add DAMA-specific products or services only when their information is available.
- Static GitHub Pages cannot execute the included Next.js API route. Contact, project-inquiry and careers forms require a separately hosted endpoint that accepts the existing JSON payload and permits CORS from the site origin. Set `NEXT_PUBLIC_LEADS_ENDPOINT` at build time; otherwise the forms report that the message/application was not sent. For GitHub Pages, add the variable to the build step of `.github/workflows` through a repository variable after the endpoint has been configured. Never put a secret in a `NEXT_PUBLIC_` variable.
- The included API route is a starting point for a separate server deployment; it must be secured, configured with a real CRM/webhook, and deployed separately from this static export. Verify privacy/consent and anti-spam handling before enabling it.

To test a GitHub Pages build locally: `NEXT_PUBLIC_BASE_PATH=/DAMA npm run build`. The exported site is written to `out/`.
