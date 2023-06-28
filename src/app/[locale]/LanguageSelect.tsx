'use client';

import { ReactNode } from 'react';
import Link from 'next-intl/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ReactSelect, { StylesConfig } from 'react-select';

type SelectOptionProps = {
  locale: string;
  text: string;
  src: string;
};

const SelectOption = ({ locale, src, text }: SelectOptionProps) => {
  return (
    <Link href='/' locale={locale} className='flex items-center'>
      <Image src={src} height={12} width={16} alt={`language ${text} option image`} className='mr-1' />
      <span className='text-sm text-white'>{text}</span>
    </Link>
  );
};

type LanguageOption = {
  label: ReactNode;
  value: string;
};

const customStyles: StylesConfig<LanguageOption> = {
  control: provided => ({
    ...provided,
    color: 'white',
    backgroundColor: 'inherit',
    border: 'none',
    cursor: 'pointer',
    minHeight: '2.5rem',
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#0f172a',
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.isFocused ? '#1d2d50' : 'inherit',
  }),
  input: provided => ({
    ...provided,
    color: 'white',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    svg: {
      height: '1rem',
      width: '1rem',
    },
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: '4px',
  }),
};

const options = [
  {
    label: <SelectOption locale='en' text='EN' src='/images/en.jpg' />,
    value: 'en',
  },
  {
    label: <SelectOption locale='pl' text='PL' src='/images/pl.jpg' />,
    value: 'pl',
  },
];

export const LanguageSelect = () => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <ReactSelect
      options={options}
      value={options.find(option => option.value === locale)}
      placeholder={null}
      styles={customStyles}
      className='z-30'
      isSearchable={false}
    />
  );
};
