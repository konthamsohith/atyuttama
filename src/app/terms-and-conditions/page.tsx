import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website.
      </p>
      <p className="mb-4">
        The term 'us' or 'we' refers to the owner of the website. The term 'you' refers to the user or viewer of our website.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Use of this website</h2>
      <p className="mb-4">
        The use of this website is subject to the following terms of use:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
        <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
        <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
      <p className="mb-4">
        The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, we exclude all representations, warranties, conditions and terms whether express or implied, statutory or otherwise, including without limitation warranties of merchantability, fitness for a particular purpose, and non-infringement.
      </p>
      <p className="mb-4">
        We will not be liable for any damages arising from the use of this website.
      </p>
    </div>
  );
};

export default TermsAndConditions;