import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
})

export async function createPaymentIntent(amountInCents: number, metadata: Record<string, string>) {
  return stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  })
}

export async function createCheckoutSession({
  packageName,
  priceCents,
  bookingReference,
  successUrl,
  cancelUrl,
}: {
  packageName: string
  priceCents: number
  bookingReference: string
  successUrl: string
  cancelUrl: string
}) {
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: packageName,
            description: `Booking: ${bookingReference}`,
          },
          unit_amount: priceCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      bookingReference,
    },
  })
}
