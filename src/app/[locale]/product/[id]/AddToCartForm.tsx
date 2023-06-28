'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AddToCartProductType } from 'store/cartActions';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '@store';
import { Button, FormField } from '@ui';
import { getProductSizes } from '@utils/product';

type Props = {
  product: AddToCartProductType;
};

const validationSchema = z.object({
  quantity: z.string().nonempty().regex(/^\d*$/),
  color: z.string().nonempty({ message: 'Color is required' }),
  size: z.string().nonempty({ message: 'Size is required' }),
});
export type AddToCartFormSchema = z.infer<typeof validationSchema>;

export const AddToCartForm = ({ product }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useStore();
  const sizes = getProductSizes(product);
  const { watch, ...form } = useForm<AddToCartFormSchema>({
    defaultValues: {
      quantity: '1',
      color: product.colors[0].hex,
      size: product.dimensions[0].value,
    },
    resolver: zodResolver(validationSchema),
  });
  const selectedColor = watch('color');

  const handleChangeColor = (color: string) => {
    form.setValue('color', color);
  };

  const submitForm = async (data: AddToCartFormSchema) => {
    setIsSubmitting(true);
    addToCart(product, data);

    await setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Cart updated');
    }, 2000);
    return;
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)} className='flex w-2/3 flex-col '>
      <div className='mb-6 flex items-center'>
        {product.colors.map(color => (
          <div
            key={color.name}
            onClick={() => handleChangeColor(color.hex)}
            className={twMerge(
              'mx-1 flex h-6 w-6 cursor-pointer items-center justify-center border border-slate-500',
              selectedColor === color.hex && 'border border-slate-200',
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      <FormField<AddToCartFormSchema>
        label='Pool size'
        type='select'
        name='size'
        errorMessage={form.formState.errors.size?.message}
        rules={{ required: 'Pool size is required' }}
        options={sizes.map(size => ({
          text: size,
          value: size,
        }))}
        {...form}
      />

      <div className='flex items-end justify-between'>
        <FormField<AddToCartFormSchema>
          label='Quantity'
          name='quantity'
          className='w-2/3'
          errorMessage={form.formState.errors.quantity?.message}
          rules={{ required: 'Selecting quantity is required' }}
          inputProps={{ type: 'number', min: 1, max: 10, className: 'w-20' }}
          {...form}
        />
        <Button disabled={isSubmitting} className='mb-4' type='submit'>
          Add to cart
        </Button>
      </div>
    </form>
  );
};
