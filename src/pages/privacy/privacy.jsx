import React from 'react';
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <Helmet>
        <title>Privacy Policy || BattleFiesta</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${window.location.origin}/privacy`} />
        <meta name="description"
          content="Read BattleFiesta's Privacy Policy to understand how we collect, use, and protect your personal information. Learn about data security, user rights, and how we handle tournament and subscription-related data." />
      </Helmet>

      <div className="container">
        <h2>Privacy Policy</h2>
        <p>At BattleFiesta, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect your information.</p>
        <h3>Information We Collect</h3>
        <p>• Personal Information: When you sign up for an account on BattleFiesta, we may collect personal information such as your name, email address, and gaming preferences.</p>
        <p>• Usage Data: We may collect information about how you interact with our platform, including your gaming activity, preferences, and device information.</p>
        <h3>How We Use Your Information</h3>
        <p>• To Provide Services: We use your personal information to create and manage your account, process tournament registrations, and communicate with you about our services.</p>
        <p>• To Improve Our Platform: We may use usage data to analyze trends, optimize our platform, and enhance the user experience.</p>
        <h3>How We Protect Your Information</h3>
        <p>• We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.</p>
        <p>• We regularly review our security practices and update our systems to ensure the highest level of protection for your information.</p>
        <h3>Third-Party Disclosure</h3>
        <p>• We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or as necessary to provide our services.</p>
        <h3>Changes to This Privacy Policy</h3>
        <p>• We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of BattleFiesta after the changes are made will signify your acceptance of the updated policy.</p>
        <h3>Contact Us</h3>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at privacy@battlefiesta.com.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
