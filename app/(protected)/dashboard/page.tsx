import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">dashboard</h1>
            <p className="text-sm text-muted-foreground">
                bem vindo de volta, {session.user.name}
            </p>
        </div>
    )
}