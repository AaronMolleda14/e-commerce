// app/(shop)/checkout/page.tsx
import ProtectedCheckout from "@/app/components/checkout/ProtectedCheckout";

export default function CheckoutPage() {
    return <ProtectedCheckout />;
}