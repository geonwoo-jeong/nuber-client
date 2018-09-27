import Button from "Components/Button";
import Header from "Components/Header";
import Input from "Components/Input";
import React from "react";
import Helmet from "react-helmet";
import styled from "typed-components";

const Container = styled.div``;

const Form = styled.form`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

const VerifyPhonePresenter = () => (
  <Container>
    <Helmet>
      <title>Verify Phone | Uber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={""}
        placeholder={"Enter Verification Code"}
        onChange={null}
        name={"verificationKey"}
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
