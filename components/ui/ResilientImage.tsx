'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Monitor } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export default function ResilientImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = 'object-cover',
  priority = false,
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F7F7F9] to-[#E8E8EC] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <Monitor className="mb-3 h-8 w-8 text-[#686868]" strokeWidth={1.5} />
        <p className="text-sm font-medium text-[#151515]">{fallbackLabel || alt}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      quality={85}
      priority={priority}
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
