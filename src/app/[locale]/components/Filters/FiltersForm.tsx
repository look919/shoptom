'use client';

import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TranslationKeys } from 'messages/types';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import { Button, Chip, FormField } from '@ui';
import { buildQueryString } from '@utils/buildQueryString';

type FiltersFormProps = {
  translations: Omit<TranslationKeys['Filters'], 'header'>;
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
type FiltersFormSchema = z.infer<typeof validationSchema>;

export const FiltersForm = ({ colors, translations }: FiltersFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FiltersFormSchema>({
    defaultValues: {
      minPrice: '0',
      maxPrice: '10000',
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
    <form className='mt-4 flex flex-col' onSubmit={form.handleSubmit(submitForm)}>
      <FormField<FiltersFormSchema>
        label={translations.name}
        inputProps={{ placeholder: translations.name }}
        name='name'
        errorMessage={form.formState.errors.name?.message}
        {...form}
      />
      <FormField<FiltersFormSchema>
        label={translations.producer}
        inputProps={{ placeholder: translations.producer }}
        name='producer'
        errorMessage={form.formState.errors.producer?.message}
        {...form}
      />
      <div className='flex justify-evenly'>
        <FormField<FiltersFormSchema>
          label={translations.minPrice}
          inputProps={{ type: 'number' }}
          name='minPrice'
          className='w-1/3'
          errorMessage={form.formState.errors.minPrice?.message}
          {...form}
        />
        <FormField<FiltersFormSchema>
          label={translations.maxPrice}
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
        {translations.setFilters}
      </Button>
    </form>
  );
};
