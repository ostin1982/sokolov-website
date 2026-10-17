import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ locale: "ru" }];
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return children;
}