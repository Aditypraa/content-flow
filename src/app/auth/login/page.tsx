"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AuthLayout from "@/components/layouts/AuthLayout";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        try {
            // Simulate API call
            console.log("Login data:", data);
            toast.success("Login successful!");
            // Here you would typically redirect or handle login logic
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <AuthLayout
            footerText="Don't have an account?"
            footerLinkText="Register"
            footerLinkHref="/auth/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="self-stretch flex flex-col justify-start items-start gap-3">
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="self-stretch">
                                <FormLabel className="text-gray-900 text-sm font-medium font-['Archivo'] leading-tight">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Input username"
                                        className="self-stretch h-10 px-3 py-2 bg-white rounded-md border border-slate-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="self-stretch">
                                <FormLabel className="text-gray-900 text-sm font-medium font-['Archivo'] leading-tight">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative self-stretch">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Input password"
                                            className="self-stretch h-10 px-3 py-2 pr-10 bg-white rounded-md border border-slate-200"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-slate-600 opacity-50" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-slate-600 opacity-50" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="self-stretch h-10 px-4 py-2 bg-blue-600 rounded-md inline-flex justify-center items-center gap-1.5 hover:bg-blue-700"
                        disabled={form.formState.isSubmitting}
                    >
                        <span className="text-center justify-center text-slate-50 text-sm font-medium font-['Archivo'] leading-tight">
                            {form.formState.isSubmitting ? "Logging in..." : "Login"}
                        </span>
                    </Button>
                </form>
            </Form>
        </AuthLayout>
    );
};

export default LoginPage;