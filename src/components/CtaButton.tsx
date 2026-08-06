interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function CtaButton({
  href,
  children,
  variant = "primary",
  onClick,
  className = "",
}: CtaButtonProps) {
  const base =
    "inline-flex w-full items-center justify-center rounded-[var(--radius-btn)] px-6 py-4 text-center text-base font-bold tracking-wide transition-transform duration-150 active:scale-[0.98] sm:w-auto sm:text-lg";

  // Botones de compra siempre en verde — el coral queda reservado para
  // badges de urgencia/destaque, nunca para CTAs de checkout.
  const styles =
    variant === "primary"
      ? "bg-sage text-white shadow-[var(--shadow-lift)] hover:bg-sage-hover"
      : "bg-sage text-white shadow-[var(--shadow-card)] hover:bg-sage-hover";

  return (
    <a href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
