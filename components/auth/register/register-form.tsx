"use client"

import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Field, FieldGroup, FieldLabel, FieldContent, FieldError, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { OAuthButtons } from "@/components/auth/oauth-buttons"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { getAuthErrorMessage } from "@/lib/auth-errors"

const registerFormSchema = z.object({
    name: z
        .string()
        .min(4, { message: "nome deve ter pelo menos 4 caracteres" }),
    email: z
        .email({ message: "email inválido" }),
    password: z
        .string()
        .min(8, { message: "senha deve ter pelo menos 8 caracteres" })
        .refine(
            (password) =>
                /[a-z]/.test(password) &&
                /[A-Z]/.test(password) &&
                /\d/.test(password),
            { message: "senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número" }
        ),
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function RegisterForm() {
    const router = useRouter()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
        }, {
            onSuccess: () => {
                router.push("/dashboard")
            },
            onError: (error) => {
                toast.error(getAuthErrorMessage(error))
            }
        })
    }

    const isSubmitting = form.formState.isSubmitting

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs md:max-w-sm">
            <FieldGroup>
                <Controller control={form.control} name="name" render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>nome</FieldLabel>
                        <FieldContent>
                            <Input id={field.name} aria-invalid={fieldState.invalid} type="text" placeholder="joão da silva" {...field} disabled={isSubmitting} />
                        </FieldContent>
                        {fieldState.error && (
                            <FieldError>
                                {fieldState.error.message}
                            </FieldError>
                        )}
                    </Field>
                )} />
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
                    {isSubmitting ? <Spinner /> : "criar conta"}
                </Button>
                <p className="text-sm text-center">
                    já tem uma conta? <Link href="/login" className="text-primary hover:text-primary/80 font-medium hover:underline">entrar</Link>
                </p>
                <FieldSeparator className="my-2" />
                <OAuthButtons isSubmitting={isSubmitting} />
            </FieldGroup>
        </form>
    )
}