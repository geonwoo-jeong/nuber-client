import Header from "Components/Header";
import React, { SFC } from "react";
import styled from "typed-components";

const Container = styled.div``;

const ChatPresenter: SFC = () => (
  <Container>
    <Header title={"chat"} />
  </Container>
);

export default ChatPresenter;
