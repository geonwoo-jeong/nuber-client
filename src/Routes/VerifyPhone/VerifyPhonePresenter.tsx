import Button from "Components/Button";
import Header from "Components/Header";
import Input from "Components/Input";
import React, { ChangeEvent, SFC } from "react";
import Helmet from "react-helmet";
import styled from "typed-components";

const Container = styled.div``;

const Form = styled.form`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  key: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const VerifyPhonePresenter: SFC<IProps> = ({ key, onChange }) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Uber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={key}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"key"}
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
