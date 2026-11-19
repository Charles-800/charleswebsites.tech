# App Installer Packages (`public/downloads/`)

Upload your real signed app binaries directly into this folder before building and deploying `https://charleswebsites.tech`:

1. **Android APK:**
   - Upload `my-app.apk` to `public/downloads/my-app.apk`
   - Public URL: `https://charleswebsites.tech/downloads/my-app.apk`
   - Environment variable (optional override): `NEXT_PUBLIC_ANDROID_DOWNLOAD_URL="https://charleswebsites.tech/downloads/my-app.apk"`

2. **Windows Installer:**
   - Upload `my-app-setup.exe` to `public/downloads/my-app-setup.exe`
   - Public URL: `https://charleswebsites.tech/downloads/my-app-setup.exe`
   - Environment variable (optional override): `NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL="https://charleswebsites.tech/downloads/my-app-setup.exe"`

3. **iPhone / iPad (iOS):**
   - Do NOT place `.ipa` files here. Apple requires an App Store listing or approved TestFlight distribution link.
   - Leave `NEXT_PUBLIC_IOS_DOWNLOAD_URL` empty until your App Store / TestFlight link is ready.
