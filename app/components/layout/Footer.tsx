// app/components/layout/Footer.tsx
export default function Footer() {
    return (
        <footer className="border-t mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 flex justify-center gap-16">
                <div className="flex flex-col items-center">
                    <h3 className="font-semibold mb-2">Redes Sociales</h3>
                    <ul className="space-y-1 text-center md:text-left">
                        <li className="hover:text-orange-600 transition-colors cursor-pointer">Instagram</li>
                        <li className="hover:text-orange-600 transition-colors cursor-pointer">Facebook</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="font-semibold mb-2">Legal</h3>
                    <ul className="space-y-1 text-center md:text-left">
                        <li className="hover:text-orange-600 transition-colors cursor-pointer">Términos y condiciones</li>
                        <li className="hover:text-orange-600 transition-colors cursor-pointer">Política de privacidad</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 py-4">
                © {new Date().getFullYear()} Mochiflex. Todos los derechos reservados.
            </div>
        </footer>
    );
}