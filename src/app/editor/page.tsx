'use client';

import EditorClient from "@/components/Editor/EditorClient";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('SESSION_COOKIE='))
      ?.split('=')[1];

    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <EditorClient />;
}
