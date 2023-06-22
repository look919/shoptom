import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type TextareaProps = Pick<
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  'disabled' | 'onChange' | 'onBlur' | 'className' | 'placeholder' | 'name' | 'value' | 'ref'
>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge('max-w-[600px] border border-gray-200 bg-transparent p-2 placeholder:text-sm', className)}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
