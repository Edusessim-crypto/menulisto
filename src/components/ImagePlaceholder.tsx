import { useState } from "react";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  label: string;
  aspect?: string;
  className?: string;
  rounded?: string;
  icon?: React.ReactNode;
}

// Tenta carregar a imagem real de /public/images. Se o arquivo ainda não
// existir (404) ou não tiver sido informado, exibe um placeholder elegante
// no lugar, sem quebrar o layout.
export function ImagePlaceholder({
  src,
  alt,
  label,
  aspect = "aspect-[4/5]",
  className = "",
  rounded = "rounded-[var(--radius-card)]",
  icon,
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${aspect} ${className} ${rounded} flex flex-col items-center justify-center gap-3 border-2 border-dashed border-sage/40 bg-sage-light p-6 text-center`}
        role="img"
        aria-label={alt}
      >
        {icon ?? (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-sage">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            <path d="M21 15l-5-5-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="text-sm font-medium text-brown-soft">{label}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${aspect} ${className} ${rounded} object-cover`}
      onError={() => setFailed(true)}
    />
  );
}
