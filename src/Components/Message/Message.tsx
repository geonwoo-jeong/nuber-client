import React, { SFC } from "react";
import styled from "typed-components";

const Container = styled<{ mine: boolean }, any>("div")``;

interface IProps {
  text: string;
  mine: boolean;
}

const Message: SFC<IProps> = ({ text, mine }) => (
  <Container mine={mine}>{text}</Container>
);

export default Message;
