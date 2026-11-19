# Hostinger Deployment & App Installer Sync Guide (`charleswebsites.tech`)

## 1. Hostinger Node.js Build & Start Settings
In Hostinger hPanel (**Websites → Manage → Node.js / Deployments**):
- **Build command:** `npm run build`
- **Start command:** `npm run start`
- **Node.js version:** `20.x` or `22.x`

## 2. Adding Your Real App Installers (Zero Extra Config Needed)
Drop your genuine signed packages into `public/downloads/` before committing/uploading:
- **Android:** `public/downloads/my-app.apk`
- **Windows:** `public/downloads/my-app-setup.exe`
- **Mac (optional):** `public/downloads/my-app-mac.dmg`

When synced to Hostinger, the website automatically detects those real files, enables **Download for Android** / **Download for Windows**, and displays their file size.

## 3. Optional Environment Variables (Hostinger hPanel → Environment Variables)
Add only what you want to override or enable externally (for example, once an App Store / TestFlight link is ready):

```env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://charleswebsites.tech
NEXT_PUBLIC_PRODUCTION_URL=https://charleswebsites.tech

# Optional overrides (auto-detected automatically if placed in public/downloads/)
NEXT_PUBLIC_ANDROID_DOWNLOAD_URL=https://charleswebsites.tech/downloads/my-app.apk
NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL=https://charleswebsites.tech/downloads/my-app-setup.exe
NEXT_PUBLIC_IOS_DOWNLOAD_URL=
NEXT_PUBLIC_MAC_DOWNLOAD_URL=

# Email contact form delivery (Hostinger Email or Gmail App Password)
CONTACT_RECIPIENT_EMAIL=ramoyacharles920@gmail.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
```

*(Note: After changing any `NEXT_PUBLIC_*` variable in Hostinger, click **Redeploy / Rebuild** so Next.js picks up the updated value.)*
