import Header from "Components/Header";
import Place from "Components/Place";
import React, { SFC } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled from "typed-components";
import { getPlaces } from "types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <>
    <Helmet>
      <title>Places | Uber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!loading &&
        places &&
        places.length === 0 && (
          <SLink to={"/add-place"}>Place add some places!</SLink>
        )}
      {!loading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
    </Container>
  </>
);

export default PlacesPresenter;
