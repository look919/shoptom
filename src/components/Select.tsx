import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type SelectOption = { text: string; value: string };

export type SelectProps = Pick<
  React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'disabled' | 'onChange' | 'onBlur' | 'className' | 'placeholder' | 'name' | 'value' | 'ref'
> & {
  options: SelectOption[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={twMerge(
        'max-w-[600px] border border-gray-200 bg-transparent p-2 text-white placeholder:text-sm',
        className,
      )}
      {...props}
    >
      {props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';
