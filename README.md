# Fluentzee Academy — React + Vite

A responsive, multi-section landing website for Fluentzee Academy, built with React, Vite and Lucide icons.

## Requirements
- Node.js 18+ (Node 20 LTS recommended)
- npm

## Run locally
1. Extract the ZIP.
2. Open a terminal in the `fluentzee-academy` folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Before publishing
1. Open `src/App.jsx`.
2. Find `const WHATSAPP_NUMBER = "91XXXXXXXXXX";`
3. Replace it with your academy WhatsApp number using country code and digits only. Example format: `919876543210`. Do not include `+`, spaces or hyphens.
4. Confirm `EMAIL` is `fluentzeeacademytvm@gmail.com`.
5. Replace the sample stock photos with your own academy photos if desired.
6. Test all links and submit a test enquiry.

## Enquiry form behaviour
The form validates required fields in the browser and opens the visitor's default email app with a prefilled message addressed to `fluentzeeacademytvm@gmail.com`. The visitor must press Send in that email app. This is a no-backend starter setup; it does not store submissions in a database or silently send email. For a form that submits directly on the website, connect a form service or backend before launch.

## Build for production
```bash
npm run build
npm run preview
```
Vite writes production files to `dist/`.

## Free hosting on Vercel
1. Create a GitHub account if you don't already have one.
2. Create a new GitHub repository named `fluentzee-academy`.
3. Upload the contents of this project to the repository (the `package.json`, `index.html`, and `src/` folder should be at the repository root; don't upload the ZIP itself as the only file).
4. Sign in to Vercel using GitHub and choose **Add New → Project**.
5. Import the `fluentzee-academy` repository.
6. Vercel should detect Vite. Use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
7. Select **Deploy**. Vercel will provide a public `*.vercel.app` URL.
8. After future pushes to the connected GitHub branch, Vercel will automatically rebuild and redeploy the website.

## Instagram posts feed (Vercel)
The Instagram grid uses Meta's official Instagram API through the Vercel serverless function in `api/instagram.js`. It requires an Instagram Business or Creator account, a Meta developer app configured for Instagram API with Instagram Login, and an access token with the `instagram_business_basic` permission. Meta does not charge for this API, but it requires setup and the token must be kept private.

1. Set up Instagram API with Instagram Login for the FluentZee professional Instagram account and generate an access token. Follow Meta's current Instagram Platform setup guide.
2. In Vercel, open the project's **Settings → Environment Variables** and add `INSTAGRAM_ACCESS_TOKEN` with the token. Optionally set `INSTAGRAM_GRAPH_API_VERSION` to a currently supported version; otherwise the endpoint uses `v25.0`.
3. Redeploy the site after setting the variables. The social section loads 12 posts initially and offers **Load more posts** to page through the account's available media.
4. For local testing, create `.env.local` from `.env.example`, add the token there, and run the project using the Vercel CLI (`vercel dev`) so the `/api/instagram` serverless function is available. Never commit `.env.local` or expose the token through a `VITE_` variable.

The API uses Instagram Login's `/me/media` endpoint and requests only public feed media fields. Feed data is cached at the edge briefly; Instagram limits, token expiry, account permissions, and Meta API availability can affect the feed. Reauthorize or replace the token in Vercel if it expires.

## Alternative: Netlify
1. Run `npm run build`.
2. Sign in to Netlify and choose to add a new site.
3. Import the GitHub repository, or deploy the generated `dist/` folder using Netlify's manual deploy workflow.
4. For Git-based deploys, set build command `npm run build` and publish directory `dist`.

## Customising the website
- Main content, course names and contact links: `src/App.jsx`
- Styling and responsive breakpoints: `src/styles.css`
- Browser title and SEO description: `index.html`

## Notes
- Vercel and Netlify have free plans subject to their current usage limits and terms.
- Google Fonts and Unsplash images are loaded over the internet.
- No hosting account, repository or domain has been created automatically; follow the deployment steps above.
