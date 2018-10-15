import Button from "Components/Button";
import Form from "Components/Form";
import Header from "Components/Header";
import Input from "Components/Input";
import PhotoInput from "Components/PhotoInput";
import PropTypes from "prop-types";
import React, { ChangeEvent, SFC } from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import styled from "typed-components";
import { updateProfile } from "types/api";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn<updateProfile>;
  uploading: boolean;
}

const EditAccountPresenter: SFC<IProps> = ({
  email = "",
  firstName = "",
  lastName = "",
  profilePhoto = "no-profile-image.png",
  onInputChange,
  loading = true,
  onSubmit,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Uber</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        name={"firstName"}
        value={firstName}
        placeholder={"First name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        name={"lastName"}
        value={lastName}
        placeholder={"Last name"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"email"}
        name={"email"}
        value={email}
        placeholder={"Email"}
      />
      <Button onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Container>
);

EditAccountPresenter.defaultProps = {
  email: "",
  firstName: "",
  lastName: "",
  loading: true,
  profilePhoto: "no-profile-image.png",
  uploading: false
};

EditAccountPresenter.propTypes = {
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.any.isRequired,
  profilePhoto: PropTypes.string.isRequired,
  uploading: PropTypes.bool.isRequired
};

export default EditAccountPresenter;
