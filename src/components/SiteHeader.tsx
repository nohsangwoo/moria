"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collections" },
  { label: "Collaboration", href: "/collaboration" },
  { label: "News", href: "/news" },
  { label: "Business", href: "/business" },
  { label: "Contact", href: "/contact" },
];

function normalizePath(pathname: string) {
  return pathname === "" ? "/" : pathname;
}

let scrollAnimationFrame = 0;

function scrollToHashTarget(hash: string) {
  const target = document.getElementById(hash);
  if (!target) return false;

  const headerHeight = document
    .querySelector('header[aria-label="Motungi global navigation"]')
    ?.getBoundingClientRect().height ?? 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  const destination = Math.max(0, targetTop - headerHeight - 28);
  const start = window.scrollY;
  const distance = destination - start;

  if (scrollAnimationFrame) {
    window.cancelAnimationFrame(scrollAnimationFrame);
  }

  if (Math.abs(distance) < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, destination);
    return true;
  }

  const duration = Math.min(950, Math.max(420, Math.abs(distance) * 0.32));
  const startedAt = window.performance.now();
  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    window.scrollTo(0, start + distance * easeOutCubic(progress));

    if (progress < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(step);
    }
  };

  scrollAnimationFrame = window.requestAnimationFrame(step);
  return true;
}

function scheduleHashTarget(hash: string) {
  const timeouts = [0, 200, 620, 1180].map((delay) =>
    window.setTimeout(() => {
      scrollToHashTarget(hash);
    }, delay),
  );

  return () => {
    timeouts.forEach((timeout) => window.clearTimeout(timeout));
  };
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname());
  const [isCompact, setIsCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const productsHref = pathname === "/" ? "#products" : "/#products";

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setIsCompact(scrollTop > 36);
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    let cancelHashScroll = () => {};

    const scheduleHashScroll = () => {
      cancelHashScroll();
      const hash = window.location.hash.slice(1);
      cancelHashScroll = hash ? scheduleHashTarget(hash) : () => {};
    };

    scheduleHashScroll();
    window.addEventListener("hashchange", scheduleHashScroll);

    return () => {
      cancelHashScroll();
      window.removeEventListener("hashchange", scheduleHashScroll);
    };
  }, []);

  const containerClass = [
    "fixed left-1/2 z-50 w-[calc(100%_-_20px)] -translate-x-1/2 transition-all duration-500 ease-out md:w-[calc(100%_-_48px)]",
    isCompact ? "top-3 max-w-[1040px]" : "top-4 max-w-[1254px]",
  ].join(" ");

  const shellClass = [
    "relative overflow-hidden border border-black/10 bg-white/86 px-4 shadow-[0_18px_55px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-all duration-500 ease-out md:px-5",
    isCompact ? "rounded-[6px] py-2.5 md:py-2" : "rounded-[6px] py-3.5 md:py-4",
  ].join(" ");

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1 || typeof window === "undefined") return;

    const targetPath = href.slice(0, hashIndex) || pathname;
    const hash = href.slice(hashIndex + 1);
    const samePath =
      targetPath === pathname || (targetPath === "/" && pathname === "/");

    if (!samePath || !hash) return;

    const didScroll = scrollToHashTarget(hash);
    if (!didScroll) return;

    event.preventDefault();
    window.history.pushState(null, "", `#${hash}`);
    scheduleHashTarget(hash);
  };

  return (
    <header className={containerClass} aria-label="Motungi global navigation">
      <div className={shellClass}>
        <div className="grid items-center gap-3 md:grid-cols-[220px_1fr_auto]">
          <Link
            href="/"
            className="motungi-wordmark text-[22px] leading-none text-[#101010] transition-[letter-spacing] duration-500 md:text-[26px]"
            aria-label="Motungi home"
          >
            Motungi
          </Link>

          <nav
            className="hidden items-center justify-center gap-1 text-[11px] font-semibold text-[#202020] md:flex"
            aria-label="Main pages"
          >
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleLinkClick(event, item.href)}
                  className={[
                    "group relative inline-flex h-8 items-center justify-center px-3 transition-colors duration-300",
                    active ? "text-black" : "text-black/56 hover:text-black",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <span
                    className={[
                      "absolute inset-x-3 bottom-1 h-px origin-left bg-black transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <a
            href={productsHref}
            onClick={(event) => handleLinkClick(event, productsHref)}
            className="hidden h-8 items-center justify-center border border-black/18 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black/70 transition-colors duration-300 hover:border-black hover:text-black md:inline-flex"
          >
            Objects
          </a>

          <nav className="flex min-w-0 gap-1 overflow-x-auto pb-0.5 text-[10px] font-semibold text-black/58 md:hidden" aria-label="Mobile pages">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "shrink-0 border px-2.5 py-1.5 transition-colors duration-300",
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/12 bg-white/60 text-black/62",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px bg-black/70 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
