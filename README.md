# Portfolio Website - Davi Meyer

This is a modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

✨ **Complete Portfolio Solution**
- Home page with hero section and featured projects
- About page with personal information and hobbies
- Experience page with timeline, skills, and education
- Projects page with featured and other projects
- Contact page with form and contact information
- Legal pages (Impressum & Datenschutz)

🎨 **Modern Design**
- Clean and professional design
- Responsive layout for all devices
- Dark mode support (auto-detects system preference)
- Smooth animations and transitions
- Custom scrollbar styling

🛠 **Technical Highlights**
- Built with Next.js 15 (App Router)
- TypeScript for type safety
- Tailwind CSS 4 for styling
- SEO optimized with metadata
- Static site generation for optimal performance
- Easy content management via data file

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Content Management

All content can be easily edited by modifying the `/lib/data.ts` file. This includes:

- Personal information (name, title, bio, email, location)
- Social media links
- About section and hobbies
- Skills categories
- Experience and education
- Projects
- Footer links

Simply edit the data in this file to update your portfolio content - no code changes needed!

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── datenschutz/       # Privacy policy page
│   ├── experience/        # Experience page
│   ├── impressum/         # Legal notice page
│   ├── projects/          # Projects page
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation bar
│   └── Footer.tsx         # Footer component
├── lib/                   # Library files
│   └── data.ts            # Content data file
└── public/                # Static assets

```

## Customization

### Update Personal Information

Edit `/lib/data.ts` and update the `personalInfo` object:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  location: "Your Location",
  bio: "Your bio...",
};
```

### Add New Projects

Add new projects to the `projects` array in `/lib/data.ts`:

```typescript
{
  title: "Project Name",
  description: "Project description",
  tags: ["Tag1", "Tag2"],
  github: "https://github.com/...",
  demo: "https://...",
  featured: true, // or false
}
```

### Update Colors

Modify the color scheme in `app/globals.css` by changing the CSS variables:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway
- And many more...

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **React 19** - UI library

## License

© 2024 Davi Meyer. All rights reserved.

## Support

For questions or issues, please open an issue on GitHub or contact me at contact@davimeyer.dev.
