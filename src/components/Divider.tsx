import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export const Divider = ({ className }: Props) => {
  return <div className={twMerge('my-10 h-px w-full bg-slate-500', className)} />;
};
