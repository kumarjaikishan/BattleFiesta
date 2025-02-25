import React from 'react';
import { Helmet } from "react-helmet-async";

const RefundAndCancellationPolicy = () => {
  return (
    <div className="refund-cancellation-policy-container">
      <Helmet>
        <title>Refund & Cancellation || BattleFiesta</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location.origin}/refund`} />
        <meta name="description"
          content="Learn about BattleFiesta's refund and cancellation policies. Find out how refunds work, eligibility criteria, and steps to request a cancellation for your subscription or tournament services." />
      </Helmet>

      <div className="container">
        <h2>Refund and Cancellation Policy</h2>
        <p>
          At BattleFiesta, we operate under a no-refund policy.
          Given the unique nature of our SaaS offerings, we do not typically provide
          refunds, except in cases where it is legally mandated or under extraordinary circumstances.
        </p><p>
          If you wish to terminate your membership, you can reach out to us. However,
          please note that cancellation does not entail a refund of any kind. We're committed
          to providing exceptional services and support, and we're here to assist you with any
          questions or concerns you may have regarding your membership or our products.
        </p>
      </div>
    </div>
  );
}

export default RefundAndCancellationPolicy;
