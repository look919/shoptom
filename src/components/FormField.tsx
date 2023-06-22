import React from 'react';
import { UseFormRegister, Path, FieldValues, RegisterOptions } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Input, InputProps } from './Input';
import { Select, SelectOption } from './Select';
import { Textarea } from './Textarea';

type FieldType = 'input' | 'textarea' | 'select';

type Props<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  errorMessage: string | undefined;
  register: UseFormRegister<TFormValues>;
  setValue: (name: Path<TFormValues>, value: string) => void;
  rules?: RegisterOptions;
  inputProps?: Omit<InputProps, 'name'>;
  className?: string;
  type?: FieldType;
  options?: SelectOption[];
};

export const FormField = <TFormValues extends Record<string, unknown>>({
  type = 'input',
  label,
  name,
  register,
  setValue,
  errorMessage,
  rules,
  inputProps,
  className,
  options,
}: Props<TFormValues>) => {
  const errorClassName = !inputProps?.disabled && errorMessage ? 'border border-red-500' : '';
  const disabledClassName = inputProps?.disabled ? 'opacity-60' : '';

  const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is a number (0-9) or the backspace key
    const isNumberKey = /^\d$/.test(e.key) || e.key === 'Backspace';

    // If the key is not a number, prevent the default behavior
    if (!isNumberKey) {
      e.preventDefault();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(name, e.target.value.trim());
  };

  const fieldProps = {
    ...inputProps,
    className: twMerge(errorClassName, inputProps?.className),
    ...(register && register(name, rules)),
  };

  const renderFieldByType = () => {
    switch (type) {
      case 'select':
        return <Select {...fieldProps} options={options || []} />;
      case 'textarea':
        return <Textarea {...fieldProps} onBlur={handleBlur} />;
      case 'input':
      default:
        return (
          <Input
            {...fieldProps}
            onKeyDown={inputProps?.type === 'number' ? handleNumberKeyDown : undefined}
            onBlur={handleBlur}
          />
        );
    }
  };

  const fieldByType = renderFieldByType();

  return (
    <div className={twMerge('relative mb-5 flex flex-col text-sm', disabledClassName, className)}>
      <div className='mb-1 mt-0.5 flex items-center justify-between'>
        <div>
          {rules?.required && <span className='mr-1 text-red-600'>*</span>}
          <span>{label}</span>
        </div>
      </div>
      {fieldByType}
      <span className='absolute -bottom-4 mr-0.5 text-xs text-red-600'>
        {(!inputProps?.disabled && errorMessage) || ''}
      </span>
    </div>
  );
};
