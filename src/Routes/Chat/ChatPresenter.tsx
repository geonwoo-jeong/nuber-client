import Header from "Components/Header";
import Message from "Components/Message";
import React, { SFC } from "react";
import styled from "typed-components";
import { getChat, userProfile } from "types/api";

const Container = styled.div``;

interface IProps {
  data?: getChat;
  loading: boolean;
  userData?: userProfile;
}

const ChatPresenter: SFC<IProps> = ({
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  loading
}) => (
  <Container>
    <Header title={"chat"} />
    {!loading && chat && user && (
      <>
        {chat.messages &&
          chat.messages.map(message => {
            if (message) {
              return (
                <Message
                  key={message.id}
                  text={message.text}
                  mine={user.id === message.userId}
                />
              );
            }
            return null;
          })}
      </>
    )}
  </Container>
);

export default ChatPresenter;
