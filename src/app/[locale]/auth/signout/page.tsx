"use client"

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
      
      // Clear any client-side state/storage if needed
      localStorage.clear();
      sessionStorage.clear();
    };

    handleSignOut();
  }, []);

  return <div>Signing out...</div>;
}