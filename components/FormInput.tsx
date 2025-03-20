import React from 'react'
import { FormMessage, FormControl, FormLabel, FormField, FormItem, FormDescription } from './ui/form'



const FormInput = ({ 
  name, 
  control, 
  label, 
  description, 
  children,
  variant = 'default',
  formId
}: FormInputProps) => {
  return (
    <div id={formId}>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="border-t border-gray-200">
          <div className={`payment-transfer_form-item ${variant === 'default' ? 'py-5' : 'pb-6 pt-5'}`}>
            {variant === 'default' ? (
              // Regular input layout
              <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                {label}
              </FormLabel>
            ) : (
              // Layout with description
              <div className="payment-transfer_form-content">
                <FormLabel className="text-14 font-medium text-gray-700">
                  {label}
                </FormLabel>
                {description && (
                  <FormDescription className="text-12 font-normal text-gray-600">
                    {description}
                  </FormDescription>
                )}
              </div>
            )}
            <div className="flex w-full flex-col">
              <FormControl>
                {React.cloneElement(children as React.ReactElement, { ...field })}
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
    </div>
  )
}

export default FormInput

