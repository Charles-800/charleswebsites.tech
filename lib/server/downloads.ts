import { promises as fs } from 'fs';
import path from 'path';
import type { AppDownloadOverrides, ClientPlatformId } from '@/lib/config/app-clients';
import { getSiteBaseUrl, isProductionEnvironment } from '@/lib/config/site';

export type AppFileSizeMap = Partial<Record<ClientPlatformId, string>>;
export type AppLocalUrlMap = Partial<Record<ClientPlatformId, string>>;

export interface ServerAppDownloads {
  fileSizes: AppFileSizeMap;
  fallbackUrls: AppLocalUrlMap;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `~${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function inspectLocalPublicFile(relativePath: string): Promise<string | undefined> {
  try {
    const cleanRel = relativePath.replace(/^\/+/, '');
    if (!cleanRel || cleanRel.includes('..')) return undefined;
    const fullPath = path.join(process.cwd(), 'public', cleanRel);
    const stat = await fs.stat(fullPath);
    if (!stat.isFile() || stat.size <= 0) return undefined;
    return formatBytes(stat.size);
  } catch {
    return undefined;
  }
}

function resolveCandidateRelativePath(envUrl: string | undefined, defaultRel: string): string {
  if (!envUrl) return defaultRel;
  const trimmed = envUrl.trim();
  if (trimmed.startsWith('/downloads/')) {
    return trimmed.replace(/^\/+/, '');
  }
  if (trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.pathname.startsWith('/downloads/')) {
        return parsed.pathname.replace(/^\/+/, '');
      }
    } catch {
      return defaultRel;
    }
  }
  return defaultRel;
}

function buildPublicDownloadUrl(relativePath: string): string {
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  if (isProductionEnvironment()) {
    return `${getSiteBaseUrl()}${cleanPath}`;
  }
  return cleanPath;
}

export async function getServerAppDownloads(): Promise<AppDownloadOverrides> {
  const androidRel = resolveCandidateRelativePath(
    process.env.NEXT_PUBLIC_ANDROID_DOWNLOAD_URL,
    'downloads/my-app.apk'
  );
  const windowsRel = resolveCandidateRelativePath(
    process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL,
    'downloads/my-app-setup.exe'
  );
  const macRel = resolveCandidateRelativePath(
    process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL,
    'downloads/my-app-mac.dmg'
  );

  const [androidSize, windowsSize, macSize] = await Promise.all([
    inspectLocalPublicFile(androidRel),
    inspectLocalPublicFile(windowsRel),
    inspectLocalPublicFile(macRel),
  ]);

  const fileSizes: AppFileSizeMap = {};
  const fallbackUrls: AppLocalUrlMap = {};

  if (androidSize) {
    fileSizes.android = androidSize;
    fallbackUrls.android = buildPublicDownloadUrl(androidRel);
  }
  if (windowsSize) {
    fileSizes.windows = windowsSize;
    fallbackUrls.windows = buildPublicDownloadUrl(windowsRel);
  }
  if (macSize) {
    fileSizes.mac = macSize;
    fallbackUrls.mac = buildPublicDownloadUrl(macRel);
  }

  return { fileSizes, fallbackUrls };
}

export async function getLocalAppFileSizes(): Promise<AppFileSizeMap> {
  const { fileSizes } = await getServerAppDownloads();
  return fileSizes ?? {};
}
