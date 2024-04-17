import React, { useState } from "react";
import { Formik } from "formik";
import "./Wizard.css";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Application sent successfully!</p>
      </div>
    </div>
  );
};

const Wizard = () => {
  const [step, setStep] = useState(1);
  const [submittedData, setSubmittedData] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = (values, errors, setTouched) => {
    if (
      step === 1 &&
      (values.firstName === "" || values.lastName === "" || values.email === "")
    ) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
      });
      return;
    }
    if (
      step === 2 &&
      (values.streetAddress === "" ||
        values.city === "" ||
        values.state === "" ||
        values.zipCode === "")
    ) {
      setTouched({
        streetAddress: true,
        city: true,
        state: true,
        zipCode: true,
      });
      return;
    }
    if (step === 3) {
      setSubmittedData(values);
      setShowSuccessModal(true);
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 3) {
      setSubmittedData({});
      setShowSuccessModal(false);
    }
    setStep(step - 1);
  };

  return (
    <>
      <div className="step-counter">Step {step} of 3</div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
        }}
        validate={(values) => {
          const errors = {};
          if (step === 1) {
            if (!values.firstName) {
              errors.firstName = "First name is required*";
            }
            if (!values.lastName) {
              errors.lastName = "Last name is required*";
            }
            if (!values.email) {
              errors.email = "Email is required*";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
          } else if (step === 2) {
            if (!values.streetAddress) {
              errors.streetAddress = "Street address is required*";
            }
            if (!values.city) {
              errors.city = "City is required*";
            }
            if (!values.state) {
              errors.state = "State is required*";
            }
            if (!values.zipCode) {
              errors.zipCode = "Zip code is required*";
            } else if (!/^\d+$/.test(values.zipCode)) {
              errors.zipCode = "Zip code must be numeric";
            } else if (values.zipCode.length !== 5) {
              errors.zipCode = "Zip code must be 5 digits";
            }
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setTouched }) => {
          setTimeout(() => {
            if (step === 1) {
              if (!values.firstName || !values.lastName || !values.email) {
                setTouched({
                  firstName: true,
                  lastName: true,
                  email: true,
                });
              } else {
                setStep(2);
              }
            } else if (step === 3) {
              setSubmittedData(values);
              setShowSuccessModal(true);
              setSubmitting(false);
            }
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setTouched,

        }) => (
          <>
            <div className="inputs">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={
                        errors.firstName && touched.firstName ? "error" : ""
                      }
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="error">{errors.firstName}</div>
                    )}
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className={
                        errors.lastName && touched.lastName ? "error" : ""
                      }
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="error">{errors.lastName}</div>
                    )}
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={errors.email && touched.email ? "error" : ""}
                    />
                    {errors.email && touched.email && (
                      <div className="error">{errors.email}</div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleNext(values, errors, setTouched)}
                      disabled={isSubmitting || !!Object.keys(errors).length}
                    >
                      Next
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <input
                      type="text"
                      name="streetAddress"
                      placeholder="Street Address..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.streetAddress}
                      className={
                        errors.streetAddress && touched.streetAddress
                          ? "error"
                          : ""
                      }
                    />
                    {errors.streetAddress && touched.streetAddress && (
                      <div className="error">{errors.streetAddress}</div>
                    )}
                    <input
                      type="text"
                      name="city"
                      placeholder="City..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      className={errors.city && touched.city ? "error" : ""}
                    />
                    {errors.city && touched.city && (
                      <div className="error">{errors.city}</div>
                    )}
                    <input
                      type="text"
                      name="state"
                      placeholder="State..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      className={errors.state && touched.state ? "error" : ""}
                    />
                    {errors.state && touched.state && (
                      <div className="error">{errors.state}</div>
                    )}
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      className={
                        errors.zipCode && touched.zipCode ? "error" : ""
                      }
                    />
                    {errors.zipCode && touched.zipCode && (
                      <div className="error">{errors.zipCode}</div>
                    )}
                    <div className="secondstepbuttons">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNext(values, errors, setTouched)}
                        disabled={isSubmitting || !!Object.keys(errors).length}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <div className="review">
                    <h2>Review and Confirm</h2>
                    <p>First Name: {values.firstName}</p>
                    <p>Last Name: {values.lastName}</p>
                    <p>Email: {values.email}</p>
                    <p>Street Address: {values.streetAddress}</p>
                    <p>City: {values.city}</p>
                    <p>State: {values.state}</p>
                    <p>Zip Code: {values.zipCode}</p>
                    <br />
                    <div className="thirdstepbuttons">
                      <button type="button" onClick={handleBack}>
                        Back
                      </button>
                      <button className="submit" type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            <SuccessModal
              isOpen={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
            />
          </>
        )}
      </Formik>
    </>
  );
};

export default Wizard;
