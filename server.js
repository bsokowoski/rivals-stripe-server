const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe('sk_test_sk_live_51RyFlXEBVhootV0zJaRVlfrejihKBO6YRPaMpjMKY2GouaCB7vueD49TZ3a5a29swBkxILyaMrqxw6srhwAIXm4000SsXUPLBx'); // Replace with your real secret key

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // dollars to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Stripe backend is running.');
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
