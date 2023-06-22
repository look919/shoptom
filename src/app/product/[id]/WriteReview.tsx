'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { useUser } from '@clerk/nextjs/app-beta/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, FormField, Icons } from '@ui';
import { postReview } from './actions';

type Props = {
  productId: string;
};

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Review title is required' }),
  body: z.string().min(5).max(1000),
  rating: z
    .number({ description: 'Rating is required' })
    .min(1, { message: 'Rating is required' })
    .max(5, { message: 'Rating must be between 1 and 5' }),
});
export type WriteReviewFormSchema = z.infer<typeof validationSchema>;

export const WriteReview = ({ productId }: Props) => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLDialogElement | null>(null);
  const { watch, ...form } = useForm<WriteReviewFormSchema>({
    defaultValues: {
      rating: 0,
    },
    resolver: zodResolver(validationSchema),
  });
  const formRating = watch('rating');

  const getStarStyles = (rating: number) => formRating >= rating && 'fill-yellow-500 stroke-black';

  const handleChangeRating = (rating: number) => {
    if (rating === formRating) {
      form.setValue('rating', 0);
      return;
    }
    form.setValue('rating', rating);
  };

  const submitForm = async (data: WriteReviewFormSchema) => {
    setIsSubmitting(true);
    const res = await postReview({ userId: user?.id!, productId, data });

    switch (res.status) {
      case 201: {
        toast.success('Review submitted successfully');
        ref.current?.close();
        break;
      }
      case 401:
      case 500:
      default: {
        toast.error(res.statusText);
        break;
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <button className='ml-2 underline' onClick={() => ref.current?.showModal()}>
        Write a Review
      </button>
      <dialog
        className='fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-900 backdrop:bg-slate-700 backdrop:bg-opacity-30'
        ref={ref}
      >
        <form className='flex flex-col p-6' onSubmit={form.handleSubmit(submitForm)}>
          <h4 className='text-xl'>Write a review</h4>
          <Divider className='my-4' />
          <div className='relative mb-6 mt-2 flex items-center'>
            <span className='mr-2'>Rating:</span>
            {[1, 2, 3, 4, 5].map(rating => (
              <div key={rating} onClick={() => handleChangeRating(rating)}>
                <Icons.star
                  className={twMerge('mx-0.25 h-6 w-6 cursor-pointer hover:fill-yellow-500', getStarStyles(rating))}
                />
              </div>
            ))}
            {formRating === 0 && form.formState.errors?.rating?.message && (
              <span className='absolute -bottom-4 mr-0.5 text-xs text-red-600'>
                {form.formState.errors.rating.message}
              </span>
            )}
          </div>

          <FormField<WriteReviewFormSchema>
            label='Title'
            inputProps={{ placeholder: 'Review title' }}
            name='title'
            errorMessage={form.formState.errors.title?.message}
            rules={{ required: 'Title is required' }}
            {...form}
          />
          <FormField<WriteReviewFormSchema>
            type='textarea'
            label='Description'
            inputProps={{
              placeholder: 'Tell us what you think about this product',
              className: 'whitespace-pre-wrap',
            }}
            name='body'
            errorMessage={form.formState.errors.body?.message}
            rules={{ required: 'Description is required' }}
            {...form}
          />
          <div className='mt-6 flex items-center justify-end'>
            <Button type='button' onClick={() => ref.current?.close()} className='mr-2 bg-red-500 hover:bg-red-800 '>
              Cancel
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              Send Review
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
};
