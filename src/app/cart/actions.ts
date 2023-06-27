'use server';

import { CartProduct } from 'store/cartActions';
import { Stripe } from 'stripe';

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

type Props = {
  customerId: string;
  cartProducts: CartProduct[];
};

export async function createPayment({ cartProducts }: Props) {
  const origin = 'https://shoptom.vercel.app/cart';

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: cartProducts.map(cartItem => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: cartItem.details.name,
          },
          unit_amount: cartItem.details.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}?success=true`,
      cancel_url: `${origin}?canceled=true`,
    });

    return { status: 200, statusText: 'OK', url: session.url };
  } catch (err: unknown) {
    return { status: 500, statusText: 'Something went wrong during checkout', url: null };
  }
}
