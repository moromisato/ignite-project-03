import { NextApiResponse, NextApiRequest } from 'next';
import { Readable } from 'stream';
import { Stripe } from 'stripe';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunk.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if ( req.method === 'POST' ) {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`)
    }
 
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }

}