import {
  PRODUCTION_SITE_URL,
  getAppEnvironment,
  getSiteBaseUrl,
} from '@/lib/config/site';

export type ClientPlatformId = 'android' | 'ios' | 'windows';

export interface AppPlatformConfig {
  id: ClientPlatformId;
  name: string;
  requirements: string;
  packageFormat: string;
  downloadUrl: string | null;
  status: 'available' | 'coming_soon';
  targetWebsiteUrl: string;
}

function resolveDownloadUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  // Accept verified https:// release links or verified local /downloads/ assets only
  if (trimmed.startsWith('https://') || trimmed.startsWith('/downloads/')) {
    return trimmed;
  }
  return null;
}

export function getProductionAppTargetUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  if (envUrl && envUrl.startsWith('https://')) {
    return envUrl.replace(/\/$/, '');
  }
  return PRODUCTION_SITE_URL;
}

export function getActiveClientTargetUrl(): string {
  return getSiteBaseUrl();
}

export function getAppClientPlatforms(): AppPlatformConfig[] {
  const productionTarget = getProductionAppTargetUrl();
  const androidUrl = resolveDownloadUrl(process.env.NEXT_PUBLIC_ANDROID_DOWNLOAD_URL);
  const iosUrl = resolveDownloadUrl(process.env.NEXT_PUBLIC_IOS_DOWNLOAD_URL);
  const windowsUrl = resolveDownloadUrl(process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL);

  return [
    {
      id: 'android',
      name: 'Android',
      requirements: 'Android 8.0+ (APK / Play Store)',
      packageFormat: 'APK / Google Play',
      downloadUrl: androidUrl,
      status: androidUrl ? 'available' : 'coming_soon',
      targetWebsiteUrl: productionTarget,
    },
    {
      id: 'ios',
      name: 'iOS',
      requirements: 'iPhone & iPad · iOS 15.0+',
      packageFormat: 'Apple App Store',
      downloadUrl: iosUrl,
      status: iosUrl ? 'available' : 'coming_soon',
      targetWebsiteUrl: productionTarget,
    },
    {
      id: 'windows',
      name: 'Windows',
      requirements: 'Windows 10 & Windows 11 (64-bit)',
      packageFormat: 'EXE / MSIX Desktop App',
      downloadUrl: windowsUrl,
      status: windowsUrl ? 'available' : 'coming_soon',
      targetWebsiteUrl: productionTarget,
    },
  ];
}

export const CLIENT_APPS_SHARED_CONFIG = {
  appName: 'Charles Websites',
  appId: 'tech.charleswebsites.app',
  environment: getAppEnvironment(),
  productionUrl: getProductionAppTargetUrl(),
  activeUrl: getActiveClientTargetUrl(),
  platforms: {
    android: {
      packageName: 'tech.charleswebsites.android',
      wrapperType: 'TWA / Capacitor WebView',
      startUrl: getProductionAppTargetUrl(),
    },
    ios: {
      bundleIdentifier: 'tech.charleswebsites.ios',
      wrapperType: 'WKWebView / Capacitor',
      startUrl: getProductionAppTargetUrl(),
    },
    windows: {
      appUserModelId: 'tech.charleswebsites.desktop',
      wrapperType: 'Edge WebView2 / Desktop Shell',
      startUrl: getProductionAppTargetUrl(),
    },
  },
} as const;
