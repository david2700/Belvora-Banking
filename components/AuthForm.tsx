"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput"
import { AuthFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';
import { getAccounts } from '@/lib/actions/bank.actions';

const  AuthForm = ({type}: {type: string}) => {
   
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const formSchema = AuthFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ''
        },
      })
     
      // 2. Define a submit handler.
      const  onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setError(null);
        try {
            //sign up with Appwrite and create plaid token

       
            if (type === "sign-up") {
            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                email: data.email,
                password: data.password,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
            }

             const newUser = await signUp(userData);
             if (!newUser) {
                throw new Error("Sign up failed, please check your details and try again");
             }

            setUser(newUser);
            } 
            if (type === "sign-in") {
                const loggedInUser = await signIn({
                    email: data.email,
                    password: data.password
                })

                const accounts = await getAccounts({
                    userId: loggedInUser?.$id
                })

                const accountsLength = accounts?.data?.length;

                
                if (accountsLength === 0) {
                 setUser(loggedInUser);
                };


                if(accountsLength > 0) {
                    router.push("/");
                } else {
                    throw new Error("Email or password is incorrect. Please check your details and try again");
                }
            }
        } catch (error) {
            console.log(error)
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
            setIsLoading(false);
        }
      }

  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gao-8">
            <Link href="/"
            className="mb-12 cursor-pointer flex items-center gap-1"
            >
                <Image
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt="Belvora logo"
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                    Belvora
                </h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className="text-24 lg:text-26 font-semibold text-gray-900">
                    {user
                    ? 'Link Account'
                    : type === "sign-in"
                    ? 'Sign in'
                    : 'Sign up'}
                    <p className='text-16 font-normal text-grey-699'>
                    {user
                    ? "Link your account to get started"
                    : "Please enter your details"
                    }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                <PlaidLink user={user!} variant="primary" />
            </div>
        ): (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {
                            type === "sign-up" && (
                                <>
                                    <div className="flex justify-around gap-4">
                                        <CustomInput formId="auth-form-firstName" control={form.control} name="firstName" placeholder="John" label="First Name"/>
                                        <CustomInput formId="auth-form-lastName" control={form.control} name="lastName" placeholder="Doe" label="Last Name"/>
                                    </div>
                                    <CustomInput formId="auth-form-address1" control={form.control} name="address1" placeholder="Enter your specific address" label="Address"/>
                                    <CustomInput formId="auth-form-city" control={form.control} name="city" placeholder="e.g: New York City" label="City"/>
                                    <div className="flex justify-around gap-4">
                                        <CustomInput formId="auth-form-state" control={form.control} name="state" placeholder="e.g: NY" label="State"/>
                                        <CustomInput formId="auth-form-postalCode" control={form.control} name="postalCode" placeholder="e.g: 11101" label="5-digit Postal Code"/>
                                    </div>
                                    <div className="flex justify-around gap-4">
                                        <CustomInput formId="auth-form-dateOfBirth" control={form.control} name="dateOfBirth" placeholder="YYYY-MM-DD" label="Date of Birth"/>
                                        <CustomInput formId="auth-form-ssn" control={form.control} name="ssn" placeholder="e.g: 1234" label="Last 4 digits of SSN"/>
                                    </div>
                                </>
                            )
                        }
                        <CustomInput formId="auth-form-email" control={form.control} name="email" placeholder="Enter your email" label="Email"/>
                        <CustomInput formId="auth-form-password" control={form.control} name="password" placeholder="Enter your password" label="Password"/>
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        <div className="flex flex-col gap-4">
                            <Button type="submit" className="form-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
                                    </>
                                ): type === "sign-in" ? "Sign In" : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </Form>
                <footer className="flex justify-center gap-1">
                    <p className='text-14 font-normal text-gray-600'>
                        {type === "sign-in"
                        ? "Don't have an account?"
                        : "Already have an account"}
                    </p>
                    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
                        {type === "sign-in" ? "Sign Up" : "Sign In"}
                    </Link>
                </footer>
            </>
        ) }
    </section>
  )
}

export default AuthForm