// app/(info)/about/page.tsx
"use client";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center px-10 py-20 card max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Sobre nosotros
                </h1>
                <p className="text-gray-600 mb-6 text-lg">
                    Somos una empresa enfocada en ofrecer productos de alta calidad,
                    priorizando la experiencia del cliente y la innovación constante.
                </p>
            </div>
        </div>
    );
}
