import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="relative min-h-screen flex items-center justify-center">
            <header className="absolute top-0 right-0 left-0 flex items-center justify-between p-4">
                <Button variant="ghost" size="sm" asChild className="group">
                    <Link href="/">
                        <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        voltar
                    </Link>
                </Button>
                <ThemeToggle variant="ghost" size="icon-sm" />
            </header>
            {children}
        </main>
    )
}