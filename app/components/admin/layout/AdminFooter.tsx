// app/components/admin/AdminFooter.tsx
export default function AdminFooter() {
    return (
        <footer className="border-t mt-auto">
            <div className="text-center text-sm text-gray-500 py-4">
                <p>© {new Date().getFullYear()} Mochiflex. Todos los derechos reservados.</p>
                <p>Esta es una app de prueba, algunas funcionalidades pueden tener bugs o no estan implementadas.</p>
            </div>
        </footer>
    );
}
