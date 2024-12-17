"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        if (token) {
            localStorage.setItem('accessToken', token);
            router.push('/');
            router.refresh();
        } else {
            // If no token is present, redirect to login
            router.push('/loginlogout');
        }
    }, [router]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse">Loading...</div>
        </div>
    );
}