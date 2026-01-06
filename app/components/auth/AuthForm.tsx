// app/components/auth/AuthForm.tsx
"use client";

import FormInput from "./FormInput";

interface Props {
    action: (formData: FormData) => void;
    error?: string;
    fields: Array<{
        name: string;
        label: string;
        type?: string;
    }>;
    submitLabel: string;
}

export default function AuthForm({
    action,
    error,
    fields,
    submitLabel,
}: Props) {
    return (
        <form action={action} className="space-y-4">
            {fields.map((field) => (
                <FormInput
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type ?? "text"}
                    required
                />
            ))}

            {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}

            <button type="submit" className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {submitLabel}
            </button>
        </form>
    );
}