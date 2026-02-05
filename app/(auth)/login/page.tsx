import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login/login-form";

export default async function Login() {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">bem vindo de volta</h1>
                <p className="text-sm text-muted-foreground">
                    entre em sua conta para acessar o app
                </p>
            </div>
            <LoginForm />
        </div>
    )
}