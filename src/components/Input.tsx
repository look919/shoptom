import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = Pick<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  | 'disabled'
  | 'onChange'
  | 'onBlur'
  | 'onKeyDown'
  | 'className'
  | 'placeholder'
  | 'name'
  | 'value'
  | 'type'
  | 'min'
  | 'max'
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge('max-w-[600px] border border-gray-200 bg-transparent p-2 placeholder:text-sm', className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';
