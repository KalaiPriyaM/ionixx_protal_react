import React from "react";
import ForgotForm from "./forgot-form";
import FormLayout from "../../ui/form-layout";

const ForgotPassword = () => {
  return (
    <div>
      <FormLayout
        children={<ForgotForm />}
        title="Forgot your password?"
        description="No worries, we'll send you reset instructions."
      />
    </div>
  );
};

export default ForgotPassword;
