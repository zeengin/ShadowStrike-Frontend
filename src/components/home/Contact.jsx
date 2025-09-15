import React from "react";

const Contact = () => {
  return (
    <section className="contact-us pt-120 pb-120" id="contact_us">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          
          {/* Left Section */}
          <div className="col-lg-5">
            <div className="section-text">
              <h4 className="sub-title">
                Have <span>Questions?</span>
              </h4>
              <span className="fs-two heading mb-6">
                We'd Love To <span>Hear From You</span>
              </span>
              <p>
                Please fill out the form and let us know about your concerns. We will try our best to
                provide optimized solutions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-5 me-20 mt-7 mt-lg-0">
            <form action="#" className="p-4">
              <div className="form-inside p-4">
                <div className="row">
                  
                  {/* Name */}
                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <label htmlFor="contactName">Name</label>
                      <input
                        type="text"
                        id="contactName"
                        placeholder="Enter Your Name"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <label htmlFor="contactEmail">Email</label>
                      <input
                        type="email"
                        id="contactEmail"
                        placeholder="Enter your email"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="col-sm-12">
                    <div className="single-input text-start">
                      <label htmlFor="contactMessage">Leave us a message</label>
                      <textarea
                        cols="4"
                        rows="4"
                        id="contactMessage"
                        placeholder="Please type your Message here..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-sm-12 mt-4">
                    <div className="btn-area">
                      <button type="submit" className="box-style btn-box">
                        Send Message
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
