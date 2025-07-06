"use client";

import { useEffect, useState } from "react";

export function BackgroundEffects() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Main gradient background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20" />
            </div>

            {/* Floating orbs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute top-3/4 right-3/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "4s" }}
                />
            </div>

            {/* Grid pattern */}
            <div className="fixed inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>
        </>
    );
}
