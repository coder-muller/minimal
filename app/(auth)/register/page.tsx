import { RegisterForm } from "@/components/auth/register/register-form";

export default function Register() {
    return (
        <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">criar conta</h1>
                <p className="text-sm text-muted-foreground">
                    crie uma conta para continuar
                </p>
            </div>
            <RegisterForm />
        </div>
    )
}