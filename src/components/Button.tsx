import { twMerge } from 'tailwind-merge';
import React from 'react';

type ButtonProps = Pick<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children' | 'onClick' | 'type' | 'disabled' | 'formMethod' | 'className'
>;

export const Button = ({ children, className, ...props }: ButtonProps) => {
  const staticStyles = 'px-4 py-2 bg-cyan-600 rounded';
  const actionStyles = 'transition ease-out duration-300 hover:bg-cyan-800 active:translate-y-1';
  const disabledStyles = props.disabled && 'bg-slate-600';

  return (
    <button className={twMerge(staticStyles, actionStyles, disabledStyles, className)} {...props}>
      {children}
    </button>
  );
};
