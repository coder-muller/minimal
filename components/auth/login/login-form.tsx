"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Field, FieldGroup, FieldLabel, FieldContent, FieldError, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { OAuthButtons } from "@/components/auth/oauth-buttons"

import { toast } from "sonner"
import Link from "next/link"

const loginFormSchema = z.object({
    email: z.email({ message: "email inválido" }),
    password: z.string().min(1, { message: "senha é obrigatória" }),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log(data)
        toast.success("login realizado com sucesso")
    }

    const isSubmitting = form.formState.isSubmitting

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs md:max-w-sm">
            <FieldGroup>
                <Controller control={form.control} name="email" render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>email</FieldLabel>
                        <FieldContent>
                            <Input id={field.name} aria-invalid={fieldState.invalid} type="email" placeholder="exemplo@email.com" {...field} disabled={isSubmitting} />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>
                                {fieldState.error.message}
                            </FieldError>
                        )}
                    </Field>
                )} />
                <Controller control={form.control} name="password" render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>senha</FieldLabel>
                        <FieldContent>
                            <Input id={field.name} aria-invalid={fieldState.invalid} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" {...field} disabled={isSubmitting} />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>
                                {fieldState.error.message}
                            </FieldError>
                        )}
                    </Field>
                )} />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner /> : "entrar"}
                </Button>
                <p className="text-sm text-center">
                    não tem uma conta? <Link href="/register" className="text-primary hover:text-primary/80 font-medium hover:underline">cadastre-se</Link>
                </p>
                <FieldSeparator className="my-2" />
                <OAuthButtons isSubmitting={isSubmitting} />
            </FieldGroup>
        </form>
    )
}