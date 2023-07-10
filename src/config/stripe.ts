import type { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';

// env
import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
};

export default getStripe;