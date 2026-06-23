# Triple Dynamic Solution, LLC — Website

Marketing site for Triple Dynamic Solution, LLC. Built with **React + Vite**, deployed to
**GitHub Pages**, served from the custom domain **[tdsolve.com](https://tdsolve.com)**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/) for dev/build
- Plain CSS (custom properties, no framework) — modern dark theme
- GitHub Actions for CI/CD to GitHub Pages

## Local development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build to ./dist
npm run preview  # preview the production build locally
```

## Project structure

```
public/
  CNAME          # custom domain for GitHub Pages (tdsolve.com)
  favicon.svg    # placeholder favicon / mark
src/
  components/    # Navbar, Footer, Logo (placeholder)
  sections/      # Hero, Services, About, WhyUs, Contact
  App.jsx        # page composition
  index.css      # global styles + design tokens
.github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which builds the site and
publishes it to GitHub Pages. No manual steps required after the initial setup below.

### One-time GitHub Pages setup

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Under **Custom domain**, enter `tdsolve.com` and save (this is also enforced by
   `public/CNAME`).
3. Enable **Enforce HTTPS** once the certificate is provisioned.

### Squarespace DNS (connecting tdsolve.com)

In Squarespace: **Settings → Domains → tdsolve.com → DNS Settings**, add:

| Type  | Host  | Value                       |
| ----- | ----- | --------------------------- |
| A     | @     | 185.199.108.153             |
| A     | @     | 185.199.109.153             |
| A     | @     | 185.199.110.153             |
| A     | @     | 185.199.111.153             |
| CNAME | www   | royyeh007.github.io         |

DNS changes can take up to 24–48 hours to propagate. The `www` CNAME points at the
GitHub Pages host (`<username>.github.io`).

## Customizing

- **Logo:** replace `src/components/Logo.jsx` and `public/favicon.svg` with final brand art.
- **Content:** edit the arrays/text in `src/sections/*`.
- **Colors:** tweak the CSS custom properties at the top of `src/index.css`.
- **Contact form:** currently opens the visitor's email client. For a real backend, wire
  up [Formspree](https://formspree.io/) or similar in `src/sections/Contact.jsx`.
