# I.T MAN APPLE CARE - Deployment Guide

## Pre-Deployment Checklist

### Environment Variables
Create a `.env.local` file with:

```env
# Required for production
NEXT_PUBLIC_SITE_URL=https://itmanapplecare.com

# Optional: Analytics (if using)
NEXT_PUBLIC_GA_ID=

# Optional: WhatsApp number (replace in repair-form.tsx)
WHATSAPP_NUMBER=1234567890
```

### Required Images
Place in `public/` folder:
- `favicon.ico` - Site favicon
- `og-image.png` - Open Graph image (1200x630px)
- Product images in `public/images/`
- Repair before/after images in `public/images/`

## Build Commands

### Local Production Build
```bash
npm run build
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect GitHub repository to Vercel for automatic deployments.

## Performance Best Practices

### Image Optimization
- Use `next/image` for all images
- Always provide `sizes` prop for responsive images
- Use WebP/AVIF formats (auto-configured in next.config.js)

### Code Splitting
- Heavy components use `next/dynamic` with `ssr: false`
- 3D scenes load client-side only
- Carousel is lazy-loaded

### Animation Optimization
- Lenis uses `requestAnimationFrame` properly
- Mobile devices get reduced animation duration
- GSAP ScrollTrigger cleans up on unmount

### Mobile Performance
- Reduced Lenis duration on mobile (0.8s vs 1.2s)
- Touch-optimized with multiplier settings
- Heavy 3D components lazy-loaded

## SEO Checklist

- [x] Meta tags configured in layout.tsx
- [x] Open Graph tags for social sharing
- [x] Twitter card metadata
- [x] Structured data ready
- [x] Sitemap (run `npm run build` to generate)

## Post-Deployment

1. **Verify SEO**
   - Test in Google Search Console
   - Check social card preview

2. **Monitor Performance**
   - Vercel analytics dashboard
   - Core Web Vitals should be green

3. **Update WhatsApp**
   - Edit `components/sections/repair-form.tsx`
   - Replace `WHATSAPP_NUMBER` with actual number
   - Redeploy

## Quick Deploy Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Known Issues

- Ensure product/repair images exist in `public/images/`
- WhatsApp number needs manual update in code