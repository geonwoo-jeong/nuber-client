import Button from "Components/Button";
import Form from "Components/Form";
import Header from "Components/Header";
import Input from "Components/Input";
import PropTypes from "prop-types";
import React, { ChangeEvent, SFC } from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import styled from "typed-components";
const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const VerifyPhonePresenter: SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Uber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        disabled={loading}
        value={loading ? "Verifying" : "Submit"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

VerifyPhonePresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verificationKey: PropTypes.string.isRequired
};

export default VerifyPhonePresenter;
