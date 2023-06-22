import { ReactNode, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type ChipProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  children: ReactNode;
};

export const Chip = (props: ChipProps) => {
  return (
    <button
      className={twMerge(
        'mb-2 mr-2 w-fit cursor-pointer rounded-full bg-slate-600 px-4 py-1 text-sm font-semibold text-gray-300 hover:bg-slate-700',
        props.isActive && 'bg-sky-300 text-gray-700',
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
