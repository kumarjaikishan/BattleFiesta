import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <div className="terms-and-conditions-container">
      <Helmet>
        <title>Terms & Conditions || BattleFiesta</title>
       <link rel="canonical" href={`${window.location.origin}/terms`} />
        <meta name="description"
          content="Read BattleFiesta's Terms & Conditions to understand the rules and guidelines for using our platform. Learn about tournament policies, user responsibilities, and other important legal information." />
      </Helmet>

      <div className="container">
        <h2>Terms and Conditions</h2>
        <p>Welcome to BattleFiesta. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions:</p>

        <h3>1. Account Registration</h3>
        <p>You must be at least 18 years old to create an account on BattleFiesta. By registering an account, you agree to provide accurate and complete information about yourself.</p>

        <h3>2. User Conduct</h3>
        <p>• You agree to use BattleFiesta for lawful purposes only and to comply with all applicable laws and regulations.</p>
        <p>• You are solely responsible for your conduct on BattleFiesta, including any content you submit or share on the platform.</p>

        <h3>3. Intellectual Property</h3>
        <p>• All content and materials on BattleFiesta, including logos, trademarks, and graphics, are the property of BattleFiesta or its licensors and are protected by copyright and other intellectual property laws.</p>
        <p>• You may not use, reproduce, or distribute any content from BattleFiesta without prior written permission.</p>

        <h3>4. Limitation of Liability</h3>
        <p>• BattleFiesta is provided on an "as is" and "as available" basis. We do not guarantee that the platform will be error-free or uninterrupted.</p>
        <p>• BattleFiesta shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with your use of the platform.</p>

        <h3>5. Changes to Terms and Conditions</h3>
        <p>• BattleFiesta reserves the right to update or modify these terms and conditions at any time. Any changes will be effective immediately upon posting on this page.</p>
        <p>• Your continued use of BattleFiesta after the changes are made constitutes your acceptance of the updated terms and conditions.</p>

        <h3>6. Contact Us</h3>
        <p>If you have any questions or concerns about these terms and conditions, please contact us at legal@battlefiesta.com.</p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
