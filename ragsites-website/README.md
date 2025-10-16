# RagSites Marketing Website

Modern, animated landing page for RagSites AI agency.

## Features

- Modern animated hero section with gradient effects
- Pain points and solutions sections
- Clear call-to-action buttons
- Fully responsive design
- Built with Next.js 15, TypeScript, and Tailwind CSS

## Getting Started

1. Navigate to the project directory:
```bash
cd ragsites-website
```

2. Install dependencies:
```bash
npm install
```

3. Update the Google Calendar link:
   - Open `app/page.tsx`
   - Replace `YOUR_LINK_HERE` on line 13 with your actual Google Calendar booking link

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Update Calendar Link
Edit the `CALENDAR_LINK` constant in `app/page.tsx`:
```typescript
const CALENDAR_LINK = "your-google-calendar-link-here";
```

### Modify Content
All content can be edited directly in `app/page.tsx`. The page includes:
- Hero section
- Pain points cards
- Solutions metrics
- Features section
- CTA sections

### Styling
The project uses Tailwind CSS. Modify styles directly in the JSX or update `tailwind.config.ts` for theme changes.

## Deployment

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

## Project Structure

```
ragsites-website/
├── app/
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
└── package.json
```
