"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenisContext } from "@/hooks/useLenisContext";

/**
 * A nav-style link that's routing-aware: same-page hash targets (or the
 * homepage root while already on it) get the existing Lenis smooth-scroll
 * treatment; everything else (a different route, or a hash on a different
 * route) falls through to plain Next.js <Link> navigation, which already
 * lands on the right hash after a cross-page transition on its own.
 */
export function SmartLink({
  href,
  className,
  children,
  onNavigate,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const lenis = useLenisContext();

  const hashIndex = href.indexOf("#");
  const hasHash = hashIndex !== -1;
  const pathPart = hasHash ? href.slice(0, hashIndex) || "/" : href;
  const isSamePage = pathPart === pathname;

  const handleClick = (event: React.MouseEvent) => {
    if (!isSamePage) {
      onNavigate?.();
      return;
    }
    event.preventDefault();
    onNavigate?.();
    if (hasHash) {
      lenis?.scrollTo(href.slice(hashIndex), { offset: -24 });
    } else {
      lenis?.scrollTo(0, { offset: 0 });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
