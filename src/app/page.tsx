"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ru");
  }, [router]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
      <p>Перенаправление...</p>
      <Link href="/ru">Перейти на сайт</Link>
    </main>
  );
}
