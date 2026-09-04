'use client';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from 'sonner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function useLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    const res = await fetch(`${apiUrl}/api/auth/signout`);

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || 'Unable to logout');
      setIsLoading(false);
      return;
    }

    router.push('/signup');
  }

  return {
    logout,
    isLoading
  }
}