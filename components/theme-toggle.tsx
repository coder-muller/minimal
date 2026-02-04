"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
    variant?: "outline" | "secondary" | "ghost" | "link" | "default"
    size?: "default" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
    className?: string
}

export function ThemeToggle({
    variant = "outline",
    size = "icon-sm",
    className,
}: ThemeToggleProps) {
    const { setTheme, theme } = useTheme()

    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <Button variant={variant} size={size} className={className} onClick={handleThemeChange}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}