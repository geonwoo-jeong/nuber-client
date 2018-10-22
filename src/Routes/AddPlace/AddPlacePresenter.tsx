import Button from "Components/Button";
import Form from "Components/Form";
import Header from "Components/Header";
import Input from "Components/Input";
import React, { ChangeEvent, SFC } from "react";
import { MutationFn } from "react-apollo";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "typed-components";
import { addPlace } from "types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn<addPlace>;
}

const AddPlacePresenter: SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit
}) => (
  <>
    <Helmet>
      <title>Add Place | Uber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onInputChange}
          value={name}
          name={"name"}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onInputChange}
          value={address}
          name={"address"}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        <Button onClick={null} value={loading ? "Adding place" : "Add Place"} />
      </Form>
    </Container>
  </>
);

export default AddPlacePresenter;
