# Victorious Medical - Production Ready Website

A modern, production-ready Next.js application for Victorious Medical's diabetic supplies buyback service.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Responsive Design**: Fully responsive with Tailwind CSS and mobile-first approach
- **SEO Optimized**: Proper meta tags, semantic HTML, sitemap, and robots.txt
- **Fast Performance**: Optimized images, code splitting, and lazy loading
- **Error Handling**: Custom 404 page, error boundaries, and loading states
- **Production Ready**: Ready to deploy to Vercel, Netlify, or any hosting platform
- **Interactive Forms**: Client-side form handling for Buy and Sell pages
- **Accessibility**: ARIA labels and keyboard navigation support

## 📋 Pages

- **Home**: Hero section with call-to-action
- **About**: Company mission and values
- **Products**: Buy/Sell options with product showcase
- **Buy**: Product catalog and quote request form
- **Sell**: Comprehensive sell request form
- **Contact**: Contact information and contact form

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── buy/            # Buy supplies page
│   ├── contact/        # Contact page
│   ├── products/       # Products page
│   ├── sell/           # Sell supplies page
│   ├── error.tsx       # Error boundary
│   ├── loading.tsx    # Loading state
│   ├── not-found.tsx  # 404 page
│   ├── robots.ts       # Robots.txt generator
│   ├── sitemap.ts      # Sitemap generator
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Footer component
├── public/
│   ├── images/         # Static images
│   └── robots.txt      # Robots.txt file
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps
- DigitalOcean App Platform

## 🔧 Configuration

- **Next.js Config**: `next.config.js`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.ts`
- **PostCSS Config**: `postcss.config.js`

## 📝 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Site URL (update in app/sitemap.ts and app/robots.ts as well)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Important**: Update the domain in `app/sitemap.ts` and `app/robots.ts` before deploying to production.

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Components**: Modify components in the `components/` directory
- **Pages**: Edit pages in the `app/` directory
- **Styles**: Update `app/globals.css` for global styles

## 📄 License

© 2025 Victorious Medical. All rights reserved.

