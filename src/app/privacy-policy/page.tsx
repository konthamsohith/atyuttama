import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This privacy policy sets out how we use and protect any information that you give us when you use this website.
      </p>
      <p className="mb-4">
        We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">
        We may collect the following information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Name and job title</li>
        <li>Contact information including email address</li>
        <li>Demographic information such as postcode, preferences and interests</li>
        <li>Other information relevant to customer surveys and/or offers</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">How We Use the Information</h2>
      <p className="mb-4">
        We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Internal record keeping.</li>
        <li>We may use the information to improve our products and services.</li>
        <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Security</h2>
      <p className="mb-4">
        We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
      </p>
    </div>
  );
};

export default PrivacyPolicy;