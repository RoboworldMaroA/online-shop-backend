
// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51PA8F305YOJBBrAk9eYXENMZyBEX0bQSUIfDN1wnGTs8BtHI0fwqJaUvM9JaSwJ7rdNEyKXk9gDg91N38cZmLo5e00y5hF9Kuu');

require("dotenv").config();
const stripeKey =  process.env.STRIPE_KEY;
const stripe = require('stripe')(stripeKey);


const express = require('express');
// const app = express();
// app.use(express.static('public'));
const router = express.Router();


  // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51PA8F305YOJBBrAk9eYXENMZyBEX0bQSUIfDN1wnGTs8BtHI0fwqJaUvM9JaSwJ7rdNEyKXk9gDg91N38cZmLo5e00y5hF9Kuu');
// const express = require('express');
// const app = express();
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cartItems.map((item)=>{
    return{
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata:{
            id: item.id
          }
        },
        unit_amount: item.price*100,
      },
      quantity: item.cartQuantity,
      
    }
  })
  
  const session = await stripe.checkout.sessions.create({

    // line_items: [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: 'price_1PAUfq05YOJBBrAkgehRtHyK',
    //     quantity: 1,
    //   },
    // ],
    // {
    //   price_data: {
    //     currency: 'usd',
    //     product_data: {
    //       name: 'T-shirt',
    //     },
    //     unit_amount: 2000,
    //   },
    //   quantity: 2,
    // },

    // {
    //   price_data: {
    //     currency: 'usd',
    //     product_data: {
    //       name: 'phone',
    //     },
    //     unit_amount: 2000,
    //   },
    //   quantity: 1,
    // },
  // ]
  line_items
  ,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${YOUR_DOMAIN}/cart`,
  });

  res.send({url: session.url});
});

module.exports = router;

