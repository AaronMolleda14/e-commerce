// app/(info)/legal/page.tsx
"use client";

export default function LegalPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center py-20 card max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Información Legal
                </h1>
                <p className="text-gray-600 mb-6 text-lg">
                    Al usar este sitio aceptas nuestros términos y condiciones.
                </p>
                <p className="text-gray-600 mb-6 text-lg">
                    Toda la información es proporcionada tal cual, sin garantías explícitas.
                </p>
            </div>
        </div>
    );
}
