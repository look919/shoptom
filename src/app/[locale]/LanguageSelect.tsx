'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ReactSelect, { StylesConfig } from 'react-select';

type SelectOptionProps = {
  href: string;
  text: string;
  src: string;
};

const SelectOption = ({ href, src, text }: SelectOptionProps) => {
  return (
    <Link href={href} className='flex items-center'>
      <Image src={src} height={20} width={20} alt={`language ${text} option image`} className='mr-1' />
      <span className='text-sm text-white'>{text}</span>
    </Link>
  );
};

type LanguageOption = {
  label: React.ReactNode;
  value: string;
};

const customStyles: StylesConfig<LanguageOption> = {
  control: provided => ({
    ...provided,
    color: 'white',
    backgroundColor: '#0f172a',
    border: '1px solid gray',
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
    backgroundColor: state.isFocused ? '#1d2d50' : '#0f172a',
  }),
  input: provided => ({
    ...provided,
    color: 'white',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingLeft: '2rem',
  }),
};

const options = [
  {
    label: <SelectOption href='/en' text='EN' src='/images/en.jpg' />,
    value: 'en',
  },
  {
    label: <SelectOption href='/pl' text='PL' src='/images/pl.jpg' />,
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
      className='z-30 mr-2'
    />
  );
};
