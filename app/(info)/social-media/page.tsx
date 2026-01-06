// app/(info)/social-media/page.tsx
"use client";

import Link from "next/link";

export default function SocialMediaPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center py-20 card max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Nuestras Redes Sociales
                </h1>
                <ul className="text-gray-600 mb-6 space-y-3">
                    <li className="text-xl font-semibold hover:text-orange-600 transition-colors cursor-pointer">
                        Instagram
                    </li>
                    <li className="text-xl font-semibold hover:text-orange-600 transition-colors cursor-pointer">
                        Facebook
                    </li>
                </ul>
            </div>
        </div>
    );
}
