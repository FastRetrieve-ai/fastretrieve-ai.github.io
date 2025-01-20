# FastRetrieve.AI Landing Page

A modern landing page built with Next.js 15, React 19, and TailwindCSS, deployed on GitHub Pages.

## Tech Stack

- **Framework**: Next.js 15.1.5 with App Router
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **Development**: Turbopack
- **Form Handling**: Formspree
- **Code Quality**: ESLint, Prettier, Husky

## Security Setup

### Local Development

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Add your Formspree form IDs to `.env.local`:
```
NEXT_PUBLIC_FORMSPREE_CHAT_FORM_ID=your_chat_form_id
NEXT_PUBLIC_FORMSPREE_NEWSLETTER_FORM_ID=your_newsletter_form_id
```

### Production Deployment (GitHub Pages)

1. Go to your GitHub repository settings
2. Navigate to "Secrets and Variables" > "Actions"
3. Add these repository secrets:
   - `FORMSPREE_CHAT_FORM_ID`: Your chat form ID
   - `FORMSPREE_NEWSLETTER_FORM_ID`: Your newsletter form ID

The GitHub Actions workflow will automatically use these secrets during deployment.

### Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use GitHub Secrets for production environment variables
- ✅ Regularly rotate Formspree form IDs
- ✅ Enable GitHub security alerts
- ✅ Keep dependencies updated with `npm audit`
- ✅ Monitor form submissions for unusual activity

## Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Builds the Next.js application
2. Generates static files
3. Deploys to GitHub Pages
4. Updates the site at the configured GitHub Pages URL

You can also manually trigger a deployment from the Actions tab in your GitHub repository.

## Troubleshooting

### Forms Not Working?
- In development: Make sure `.env.local` has valid Formspree IDs
- In production: Verify GitHub Secrets are set correctly
- Check browser console for warnings or errors

### Build Failing?
- Ensure GitHub Secrets are properly configured
- Check GitHub Actions logs for detailed error messages
- Verify all dependencies are installed correctly

## Contributing

1. Install development dependencies: `npm install`
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run linting: `npm run lint`
5. Commit changes (Husky will run pre-commit hooks)
6. Push and create a pull request

## License

MIT

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
