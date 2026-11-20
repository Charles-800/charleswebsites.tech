# Hostinger Deployment Guide (`charleswebsites.tech`)

## 1. Hostinger Node.js Build & Start Settings
In Hostinger hPanel (**Websites → Manage → Node.js / Deployments**):
- **Build command:** `npm run build`
- **Start command:** `npm run start`
- **Node.js version:** `20.x` or `22.x`

## 2. Environment Variables (Hostinger hPanel → Environment Variables)
Configure the domain and email delivery variables for production:

```env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://charleswebsites.tech
NEXT_PUBLIC_PRODUCTION_URL=https://charleswebsites.tech

# Email contact form delivery (Hostinger Email or Gmail App Password)
CONTACT_RECIPIENT_EMAIL=ramoyacharles920@gmail.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=

# Optional SEO Verification, Analytics & Google Business Profile
NEXT_PUBLIC_GBP_URL=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_VERIFICATION=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

*(Note: After changing any `NEXT_PUBLIC_*` variable in Hostinger, click **Redeploy / Rebuild** so Next.js picks up the updated value.)*
