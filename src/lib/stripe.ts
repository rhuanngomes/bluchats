import { loadStripe } from '@stripe/stripe-js';
import { products } from '../stripe-config';
import { supabase } from './supabase';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  try {
    const { data: { session_id } } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        mode,
        success_url: `${window.location.origin}/register?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/precos`,
      },
    });

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Failed to load Stripe');

    const { error } = await stripe.redirectToCheckout({ sessionId: session_id });
    if (error) throw error;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getSubscriptionStatus() {
  try {
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
}