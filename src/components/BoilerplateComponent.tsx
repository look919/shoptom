import React from 'react';

type Props = {};

export const BoilerplateComponent = ({ ...props }: Props) => {
  return <input type='text' className='outline-none' {...props} />;
};
