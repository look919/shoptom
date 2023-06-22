'use client';

import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import { Button, Chip, FormField } from '@ui';
import { buildQueryString } from '@utils/buildQueryString';

type Props = {
  colors: Color[];
};

const validationSchema = z.object({
  name: z.string().optional(),
  producer: z.string().optional(),
  dimensions: z.array(z.string()).optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  colors: z.array(z.string()).optional(),
});

export type FiltersFormSchema = z.infer<typeof validationSchema>;

export const Filters = ({ colors }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FiltersFormSchema>({
    defaultValues: {
      minPrice: '0',
      maxPrice: '10000',
      dimensions: ['7ft', '8ft', '9ft'],
    },
    resolver: zodResolver(validationSchema),
  });

  const submitForm = async (data: FiltersFormSchema) => {
    setIsSubmitting(true);

    const queryString = buildQueryString(data);

    router.push(`/?${queryString}`);
    setIsSubmitting(false);
  };

  const handleChangeColor = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const color = e.currentTarget.value || '';
    const formColors = form.getValues('colors') || [];

    if (formColors.includes(color)) {
      form.setValue(
        'colors',
        formColors.filter(c => c !== color),
      );
    } else {
      form.setValue('colors', [...formColors, color]);
    }
  };

  const handleToggleChip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const chip = e.currentTarget.textContent || '';
    const chips = form.getValues('dimensions') || [];

    if (chips.includes(chip)) {
      form.setValue(
        'dimensions',
        chips.filter(c => c !== chip),
      );
    } else {
      form.setValue('dimensions', [...chips, chip]);
    }
  };

  return (
    <aside className='mt-8 flex w-full max-w-sm flex-col px-6'>
      <h2 className='text-2xl'>Filters</h2>
      <form className='mt-4 flex flex-col' onSubmit={form.handleSubmit(submitForm)}>
        <FormField<FiltersFormSchema>
          label='Name'
          inputProps={{ placeholder: 'Name' }}
          name='name'
          errorMessage={form.formState.errors.name?.message}
          {...form}
        />
        <FormField<FiltersFormSchema>
          label='Producer'
          inputProps={{ placeholder: 'Producer' }}
          name='producer'
          errorMessage={form.formState.errors.producer?.message}
          {...form}
        />
        <div className='flex justify-evenly'>
          <FormField<FiltersFormSchema>
            label='Min price'
            inputProps={{ type: 'number' }}
            name='minPrice'
            className='w-1/3'
            errorMessage={form.formState.errors.minPrice?.message}
            {...form}
          />
          <FormField<FiltersFormSchema>
            label='Max price'
            inputProps={{ type: 'number' }}
            name='maxPrice'
            className='w-1/3'
            errorMessage={form.formState.errors.maxPrice?.message}
            {...form}
          />
        </div>
        <div className='flex w-full justify-evenly gap-4'>
          {['7ft', '8ft', '9ft'].map(dim => (
            <Chip
              key={dim}
              onClick={handleToggleChip}
              isActive={form.watch('dimensions')?.some(formDim => formDim === dim)}
            >
              {dim}
            </Chip>
          ))}
        </div>
        <div className='mt-4 flex flex-wrap items-center justify-evenly gap-2'>
          {colors.map(color => (
            <button
              key={color.id}
              value={color.id}
              onClick={handleChangeColor}
              className={twMerge(
                'mx-1 flex h-6 w-6 cursor-pointer items-center justify-center border border-slate-500',
                form.watch('colors')?.some(formColor => formColor === color.id) && 'border border-slate-200',
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
        <Button disabled={isSubmitting} type='submit' className='mt-8'>
          Set filters
        </Button>
      </form>
    </aside>
  );
};
