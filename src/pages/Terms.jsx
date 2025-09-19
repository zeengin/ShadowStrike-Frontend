import React from "react";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <section
      className="terms-section text-light pt-120 pb-120"
      style={{ background: "linear-gradient(180deg, #0a0a0a, #1a1a1a)" }}
    >
      <Helmet>
        <title>SHADOWSTRIKE - Terms & Conditions</title>
      </Helmet>
      <div className="container">
        <h1 className="text-center mb-4 fw-bold text-uppercase">
          Terms & Conditions
        </h1>
        <p className="text-center mb-5">
          Welcome to <span className="fw-bold">Shadowstrike</span>.  
          Please read these Terms & Conditions carefully before using our platform.
        </p>

        {/* Section 1 */}
        <div className="mb-4">
          <h4 className="fw-bold">1. General Overview</h4>
          <p style={{ color: "#bbb" }}>
            By registering and using Shadowstrike, you agree to comply with these Terms &
            Conditions. Failure to comply may result in suspension or termination of your account.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-4">
          <h4 className="fw-bold">2. Account & Security</h4>
          <p style={{ color: "#bbb" }}>
            You are responsible for maintaining the confidentiality of your login credentials. 
            Any activity performed under your account will be deemed as your responsibility.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-4">
          <h4 className="fw-bold">3. Buying Points</h4>
          <p style={{ color: "#bbb" }}>
            Users can purchase gaming points through secure payment methods available on the platform.
            Points are non-refundable and must be used to play games offered within Shadowstrike.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-4">
          <h4 className="fw-bold">4. Fair Play Policy</h4>
          <p style={{ color: "#bbb" }}>
            Cheating, exploiting bugs, or using unauthorized software to gain advantage is strictly
            prohibited. Offenders may lose their accounts permanently.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-4">
          <h4 className="fw-bold">5. Payments & Refunds</h4>
          <p style={{ color: "#bbb" }}>
            All payments are final. Refunds are not provided once points are purchased, except where
            required by law. Ensure you verify your purchases before confirming.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-4">
          <h4 className="fw-bold">6. Liability</h4>
          <p style={{ color: "#bbb" }}>
            Shadowstrike is not liable for losses incurred from gameplay, technical issues, or 
            unauthorized access to your account. Play responsibly.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-4">
          <h4 className="fw-bold">7. Changes to Terms</h4>
          <p style={{ color: "#bbb" }}>
            Shadowstrike reserves the right to update these Terms & Conditions at any time. Users 
            will be notified of major changes via email or platform announcements.
          </p>
        </div>

        <hr style={{ borderColor: "#333" }} />

        {/* Footer Note */}
        <p className="text-center mt-4">
          By using our platform, you agree to these Terms & Conditions.  
          For questions, please contact <span style={{ color: "#00ffcc" }}>support@shadowstrike.com</span>.
        </p>
      </div>
    </section>
  );
};

export default Terms;
