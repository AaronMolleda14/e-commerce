// app/page.tsx
import ProductGrid from "./components/products/ProductGrid";
import { getProducts } from "./lib/products";

export const metadata = {
  title: 'Inicio | Mi E-commerce',
  description: 'Compra los mejores productos al mejor precio',
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-10">
      <section className="mb-12 gradient-bg rounded-2xl p-8 md:p-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
          Bienvenido
        </h1>
        <p className="text-gray-700 max-w-2xl text-lg">
          Descubre los productos más recientes y las mejores ofertas.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          ✨ Productos destacados
        </h2>

          <ProductGrid products={products}/>

      </section>
    </main>
  );
}
