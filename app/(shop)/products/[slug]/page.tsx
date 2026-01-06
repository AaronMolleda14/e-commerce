// app/(shop)/products/[slug]/page.tsx
import { prisma } from "@/app/lib/db";
import ProductDetail from "@/app/components/products/ProductDetail";
import { ProductWithImages } from "@/app/types/product";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  // ✅ Resolvemos la promesa que viene como params
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  console.log("Slug recibido:", slug);

  if (!slug) {
    return (
      <div className="text-center py-20">
        Producto no encontrado (slug vacío)
      </div>
    );
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!product) {
    return (
      <div className="text-center py-20">
        Producto no encontrado
      </div>
    );
  }

  const productWithImages: ProductWithImages = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    images: product.images.map((img) => ({ id: img.id, url: img.url })),
  };

  return <ProductDetail product={productWithImages} />;
}
