import {
  PRODUCTION_SITE_URL,
  getAppEnvironment,
  getSiteBaseUrl,
} from '@/lib/config/site';

export type ClientPlatformId = 'android' | 'windows' | 'ios' | 'mac';
export type DetectedDeviceType = ClientPlatformId | 'other';

export interface AppPlatformConfig {
  id: ClientPlatformId;
  name: string;
  shortName: string;
  requirements: string;
  fileType: string;
  suggestedFileName?: string;
  fileSize: string | null;
  downloadUrl: string | null;
  isDirectDownload: boolean;
  isExternalStore: boolean;
  status: 'available' | 'coming_soon' | 'unconfigured';
  targetWebsiteUrl: string;
  installSteps: readonly string[];
}

const BLOCKED_PLACEHOLDER_PATTERNS = [
  'coming-soon',
  'comingsoon',
  'placeholder',
  'example.com',
  'localhost',
];

export function resolveDownloadUrl(rawUrl?: string): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed === '#' || trimmed.includes('..')) return null;

  const lower = trimmed.toLowerCase();
  if (BLOCKED_PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern))) {
    return null;
  }

  if (trimmed.startsWith('/downloads/') && trimmed.length > '/downloads/'.length) {
    return trimmed;
  }

  if (trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === 'https:' && Boolean(parsed.hostname)) {
        return parsed.toString();
      }
    } catch {
      return null;
    }
  }

  return null;
}

export function detectVisitorDevice(
  userAgent: string,
  platform = '',
  maxTouchPoints = 0
): DetectedDeviceType {
  const ua = (userAgent || '').toLowerCase();
  const pf = (platform || '').toLowerCase();

  if (/android/.test(ua)) {
    return 'android';
  }

  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  }

  // iPadOS 13+ often reports "Macintosh" in Safari UA with touch points > 1
  if ((/macintosh|mac os x/.test(ua) || pf.includes('mac')) && maxTouchPoints > 1) {
    return 'ios';
  }

  if (/windows|win32|win64|wow64/.test(ua) || pf.includes('win')) {
    return 'windows';
  }

  if (/macintosh|mac os x|darwin/.test(ua) || pf.includes('mac')) {
    return 'mac';
  }

  return 'other';
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

function isInstallerFileUrl(url: string | null): boolean {
  if (!url) return false;
  const clean = url.split('?')[0].split('#')[0].toLowerCase();
  return (
    clean.startsWith('/downloads/') ||
    clean.endsWith('.apk') ||
    clean.endsWith('.exe') ||
    clean.endsWith('.msi') ||
    clean.endsWith('.msix') ||
    clean.endsWith('.dmg') ||
    clean.endsWith('.pkg') ||
    clean.endsWith('.zip')
  );
}

export interface AppDownloadOverrides {
  fileSizes?: Partial<Record<ClientPlatformId, string>>;
  fallbackUrls?: Partial<Record<ClientPlatformId, string>>;
}

export function getAppDownloadPlatforms(
  overrides?: AppDownloadOverrides | Partial<Record<ClientPlatformId, string>>
): AppPlatformConfig[] {
  const productionTarget = getProductionAppTargetUrl();

  const normalized: AppDownloadOverrides =
    overrides && ('fileSizes' in overrides || 'fallbackUrls' in overrides)
      ? (overrides as AppDownloadOverrides)
      : { fileSizes: overrides as Partial<Record<ClientPlatformId, string>> | undefined };

  const fileSizes = normalized.fileSizes;
  const fallbackUrls = normalized.fallbackUrls;

  const androidUrl =
    resolveDownloadUrl(process.env.NEXT_PUBLIC_ANDROID_DOWNLOAD_URL) ??
    resolveDownloadUrl(fallbackUrls?.android);
  const windowsUrl =
    resolveDownloadUrl(process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL) ??
    resolveDownloadUrl(fallbackUrls?.windows);
  const iosUrl = resolveDownloadUrl(process.env.NEXT_PUBLIC_IOS_DOWNLOAD_URL);
  const macUrl =
    resolveDownloadUrl(process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL) ??
    resolveDownloadUrl(fallbackUrls?.mac);

  const androidSize =
    fileSizes?.android || process.env.NEXT_PUBLIC_ANDROID_FILE_SIZE?.trim() || null;
  const windowsSize =
    fileSizes?.windows || process.env.NEXT_PUBLIC_WINDOWS_FILE_SIZE?.trim() || null;
  const macSize =
    fileSizes?.mac || process.env.NEXT_PUBLIC_MAC_FILE_SIZE?.trim() || null;

  return [
    {
      id: 'android',
      name: 'Android',
      shortName: 'Android',
      requirements: 'Android 8.0+ (Phones & Tablets)',
      fileType: 'Direct APK Package (.apk)',
      suggestedFileName: 'my-app.apk',
      fileSize: androidSize,
      downloadUrl: androidUrl,
      isDirectDownload: Boolean(androidUrl),
      isExternalStore: Boolean(androidUrl && !isInstallerFileUrl(androidUrl)),
      status: androidUrl ? 'available' : 'unconfigured',
      targetWebsiteUrl: productionTarget,
      installSteps: [
        'Open the downloaded APK file.',
        'If Android asks, allow installations from the browser/source used to download the file.',
        'Tap Install.',
        'Tap Open.',
      ],
    },
    {
      id: 'windows',
      name: 'Windows',
      shortName: 'Windows',
      requirements: 'Windows 10 & Windows 11 (64-bit)',
      fileType: 'Windows Setup Installer (.exe)',
      suggestedFileName: 'my-app-setup.exe',
      fileSize: windowsSize,
      downloadUrl: windowsUrl,
      isDirectDownload: Boolean(windowsUrl),
      isExternalStore: Boolean(windowsUrl && !isInstallerFileUrl(windowsUrl)),
      status: windowsUrl ? 'available' : 'unconfigured',
      targetWebsiteUrl: productionTarget,
      installSteps: [
        'Open the downloaded installer.',
        'If Windows shows a security warning, select "More info" and then "Run anyway" only if you trust Charles Websites.',
        'Follow the installation steps.',
      ],
    },
    {
      id: 'ios',
      name: 'iPhone / iPad',
      shortName: 'iOS',
      requirements: 'iOS 15.0+ & iPadOS',
      fileType: 'Apple App Store / TestFlight',
      fileSize: null,
      downloadUrl: iosUrl,
      isDirectDownload: false,
      isExternalStore: Boolean(iosUrl),
      status: iosUrl ? 'available' : 'coming_soon',
      targetWebsiteUrl: productionTarget,
      installSteps: [
        'Open the official App Store or TestFlight link on your iPhone or iPad.',
        'Follow the standard Apple installation prompt.',
      ],
    },
    {
      id: 'mac',
      name: 'Mac',
      shortName: 'Mac',
      requirements: 'macOS 12+ (Apple Silicon & Intel)',
      fileType: 'macOS Installer (.dmg)',
      suggestedFileName: 'my-app-mac.dmg',
      fileSize: macSize,
      downloadUrl: macUrl,
      isDirectDownload: Boolean(macUrl && isInstallerFileUrl(macUrl)),
      isExternalStore: Boolean(macUrl && !isInstallerFileUrl(macUrl)),
      status: macUrl ? 'available' : 'coming_soon',
      targetWebsiteUrl: productionTarget,
      installSteps: [
        'Open the downloaded macOS disk image (.dmg) or package.',
        'Drag Charles Websites into your Applications folder.',
      ],
    },
  ];
}

export function getOrderedPlatforms(
  platforms: AppPlatformConfig[],
  detectedDevice: DetectedDeviceType
): AppPlatformConfig[] {
  const visible = platforms.filter((platform) => {
    if (platform.id === 'mac') {
      // Hide Mac unless a Mac installer URL is set OR visitor is on Mac
      return Boolean(platform.downloadUrl) || detectedDevice === 'mac';
    }
    return true;
  });

  if (detectedDevice === 'other') {
    return visible;
  }

  const prioritized = visible.find((p) => p.id === detectedDevice);
  if (!prioritized) return visible;

  return [prioritized, ...visible.filter((p) => p.id !== detectedDevice)];
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
    mac: {
      bundleIdentifier: 'tech.charleswebsites.mac',
      wrapperType: 'WKWebView / Desktop Shell',
      startUrl: getProductionAppTargetUrl(),
    },
  },
} as const;
