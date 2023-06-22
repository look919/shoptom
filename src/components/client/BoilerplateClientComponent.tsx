'use client';

import { useState } from 'react';

type Props = {};

export const BoilerplateClientComponent = ({ ...props }: Props) => {
  const [value, setValue] = useState('test');

  return (
    <input type='text' value={value} onChange={e => setValue(e.target.value)} className='outline-none' {...props} />
  );
};
