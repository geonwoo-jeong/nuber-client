import Header from "Components/Header";
import Place from "Components/Place";
import React, { SFC } from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "typed-components";
import { getPlaces, userProfile } from "types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 50px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: MutationFn;
  userData?: userProfile;
  placesData?: getPlaces;
  userDataLoading: boolean;
  placesLoading: boolean;
}

const SettingsPresenter: SFC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  userDataLoading,
  placesLoading
}) => (
  <>
    <Helmet>
      <title>Settings | Uber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.fullName && (
            <>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </>
          )}
      </GridLink>
      {!placesLoading &&
        (places &&
          places.map(place => (
            <Place
              key={place.id}
              fav={place.isFav}
              name={place.name}
              address={place.address}
            />
          )))}
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
    </Container>
  </>
);

export default SettingsPresenter;
