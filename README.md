# 🚀 Senior Full Stack Developer Portfolio

A modern, professional portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and a comprehensive showcase of skills and projects.

## ✨ Features

- **Hero Section** with typing animation and gradient effects
- **About Section** with professional bio and quick facts
- **Skills Section** with categorized tech stack and proficiency levels
- **Projects Section** with detailed project cards and metrics
- **Experience Section** with interactive timeline
- **Contact Section** with working contact form
- **Smooth Navigation** with active section highlighting
- **Responsive Design** optimized for all devices
- **Dark Theme** with modern gradient accents
- **Performance Optimized** with Next.js 14 features

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🎨 Customization Guide

### 1. Personal Information

Update these files with your information:

#### **Navigation & Footer**
- [components/navigation.tsx](components/navigation.tsx) - Logo/Name
- [components/footer.tsx](components/footer.tsx) - Footer text and links

#### **Hero Section**
- [components/hero-section.tsx](components/hero-section.tsx)
  - Line 12-17: Update `titles` array with your roles
  - Line 78: Replace "Your Name" with your actual name
  - Line 97: Update the description
  - Line 106: Update years of experience
  - Lines 117-146: Update social media links
  - Lines 152-171: Update statistics

#### **About Section**
- [components/about-section.tsx](components/about-section.tsx)
  - Lines 52-73: Update your bio and description
  - Lines 78-109: Update quick facts
  - Replace placeholder image (line 30-33)

#### **Skills Section**
- [components/skills-section.tsx](components/skills-section.tsx)
  - Lines 5-50: Update skill categories and proficiency levels
  - Lines 129-145: Update additional technologies

#### **Projects Section**
- [components/projects-section.tsx](components/projects-section.tsx)
  - Lines 5-82: Update project details, descriptions, and metrics
  - Add actual project images
  - Update GitHub and live URLs

#### **Experience Section**
- [components/experience-section.tsx](components/experience-section.tsx)
  - Lines 5-74: Update job positions, companies, dates, and achievements
  - Update technologies for each role

#### **Contact Section**
- [components/contact-section.tsx](components/contact-section.tsx)
  - Lines 62-89: Update email, phone, and location
  - Lines 98-133: Update social media links
  - Lines 139-141: Update availability status
  - Lines 146-235: The form is functional (integrate with email service)

### 2. Colors & Theme

To customize the color scheme, edit [app/globals.css](app/globals.css):

```css
:root {
  --primary: #4A70A9;     /* Primary brand color */
  --secondary: #8FABD4;   /* Secondary color */
  --accent: #4A70A9;      /* Accent color */
  /* ... */
}
```

Or use Tailwind's gradient utilities in components:
- `from-blue-400 to-purple-400` - Gradient text
- `from-blue-600 to-purple-600` - Button gradients

### 3. Images

Add your images to the `public/` folder:

- **Profile Photo:** `public/profile.jpg`
- **Project Screenshots:** `public/project1.jpg`, `public/project2.jpg`, etc.
- **Company Logos:** `public/logos/` (optional)

Then update the image references in components.

### 4. Metadata & SEO

Update [app/layout.tsx](app/layout.tsx):

```tsx
export const metadata: Metadata = {
  title: "Your Name - Senior Full Stack Developer",
  description: "Your custom description here",
}
```

### 5. Contact Form Integration

The contact form in [components/contact-section.tsx](components/contact-section.tsx) needs backend integration. Options:

**Option A: Email Service (Recommended)**
```bash
npm install @sendgrid/mail
# or
npm install nodemailer
```

**Option B: Form Services**
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- [Web3Forms](https://web3forms.com/)

**Option C: API Route**
Create `app/api/contact/route.ts`:
```tsx
export async function POST(request: Request) {
  const data = await request.json()
  // Send email logic here
  return Response.json({ success: true })
}
```

## 📱 Sections Overview

| Section | File | Purpose |
|---------|------|---------|
| **Navigation** | `components/navigation.tsx` | Sticky header with smooth scroll |
| **Hero** | `components/hero-section.tsx` | Landing section with typing animation |
| **About** | `components/about-section.tsx` | Professional bio and facts |
| **Skills** | `components/skills-section.tsx` | Tech stack showcase |
| **Projects** | `components/projects-section.tsx` | Portfolio showcase |
| **Experience** | `components/experience-section.tsx` | Career timeline |
| **Contact** | `components/contact-section.tsx` | Contact form and info |
| **Footer** | `components/footer.tsx` | Site footer with links |

## 🎯 AI Prompts Reference

See [PROMPTS.md](PROMPTS.md) for comprehensive AI prompts to:
- Generate content for each section
- Create additional features
- Optimize performance
- Improve accessibility
- Add new sections

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`

### Custom Server

```bash
npm run build
npm start
```

## 📝 Content Checklist

Before going live, ensure you've updated:

- [ ] Personal name and title
- [ ] Professional bio
- [ ] Contact information (email, phone, location)
- [ ] Social media links (GitHub, LinkedIn, Twitter)
- [ ] Skills and proficiency levels
- [ ] Project details and images
- [ ] Work experience and achievements
- [ ] Resume/CV download link
- [ ] Profile photo
- [ ] SEO metadata
- [ ] Favicon (add to `public/`)

## 🎨 Design Features

- **Gradient Effects:** Blue to purple gradient theme
- **Glassmorphism:** Backdrop blur effects on cards
- **Smooth Animations:** Fade-in, slide-up, and hover effects
- **Responsive Grid:** Adapts to all screen sizes
- **Interactive Timeline:** Visual experience display
- **Typing Animation:** Dynamic hero text
- **Floating Elements:** Subtle background animations
- **Hover States:** Interactive feedback on all elements

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 📊 Performance Tips

1. **Optimize Images:** Use WebP format and `next/image`
2. **Lazy Loading:** Components load on scroll
3. **Code Splitting:** Automatic with Next.js
4. **Font Optimization:** Using `next/font`
5. **Minimize Bundle:** Remove unused dependencies

## 🤝 Contributing

This is a personal portfolio template. Feel free to:
- Fork and customize for your own use
- Report bugs or suggest improvements
- Share with other developers

## 📄 License

MIT License - feel free to use this template for your portfolio!

## 🆘 Support

If you need help customizing:
1. Check the customization guide above
2. Review the code comments in each component
3. Refer to [PROMPTS.md](PROMPTS.md) for AI assistance

## 🎉 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Made with ❤️ by [Your Name]**

*Last Updated: January 2026*

---

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
