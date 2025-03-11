import { Input } from "@/components/ui/input"
import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import { AuthFormSchema } from "@/lib/utils";

const formSchema = AuthFormSchema('sign-up');

interface CustomInputProps {
    control: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    placeholder: string
    label: string
}
const CustomInput = ({control, name, placeholder, label}: CustomInputProps) => {
  return (
    <div><FormField
    control={control}
    name={name}
    render={({ field }) => (
        <div className="form-item">
            <FormLabel className="form-label">
                {label}
            </FormLabel>
            <div className="w-full flex flex-col">
                <FormControl>
                    <Input  
                        placeholder={placeholder}
                        className="input-class"
                        {...field}
                        type={name === "password" ? "password" : "text"}
                    />
                </FormControl>
                <FormMessage className="form-message"/>
            </div>
        </div>
    )}
    /></div>
  )
}

export default CustomInput