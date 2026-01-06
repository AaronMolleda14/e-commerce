// app/components/auth/FormInput.tsx
"use client";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function FormInput({ label, ...props }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input {...props} className="input" />
        </div>
    );
}