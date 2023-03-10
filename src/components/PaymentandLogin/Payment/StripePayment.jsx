import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { processPaymentThreedsApi } from "../../../services/PaymentService";
import CheckoutForm from "./CheckoutForm";
import "./StripePayment.css";
import { stripe_key } from "../../../constants/Utils";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.

export default function StripePayment({payAmount}) {
  const [clientSecret, setClientSecret] = useState("");
  const [publishableKey, setPublishableKey] = useState("");   

  useEffect(() => {
      const processPaymentThreedsApiValues = async () => {
        let postPaymentDetailsApiObject = {
          total_amount: payAmount
        };
  
        try {
          let walletDetailsApiResponse = await processPaymentThreedsApi(
            postPaymentDetailsApiObject
          );
          setClientSecret(walletDetailsApiResponse.data.data.clientSecret);
          setPublishableKey(walletDetailsApiResponse.data.data.publishableKey);
        } catch (e) {}
      };
      processPaymentThreedsApiValues();
  }, []);

  const stripePromise = loadStripe(publishableKey);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App mt-5 mb-3">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}