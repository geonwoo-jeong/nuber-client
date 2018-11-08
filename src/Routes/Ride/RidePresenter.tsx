import React, { SFC } from "react";
import styled from "typed-components";
import { getRide } from "types/api";

const Container = styled.div``;

interface IProps {
  data?: getRide;
}

const RidePresenter: SFC<IProps> = () => <Container>RIde</Container>;

export default RidePresenter;
