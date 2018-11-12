import Form from "Components/Form";
import Header from "Components/Header";
import Input from "Components/Input";
import Message from "Components/Message";
import React, { SFC } from "react";
import styled from "typed-components";
import { getChat, userProfile } from "types/api";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  data?: getChat;
  loading: boolean;
  userData?: userProfile;
  messageText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ChatPresenter: SFC<IProps> = ({
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  loading,
  messageText,
  onInputChange,
  onSubmit
}) => (
  <Container>
    <Header title={"chat"} />
    {!loading && chat && user && (
      <>
        <Chat>
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
        </Chat>
        <InputCont>
          <Form submitFn={onSubmit}>
            <Input
              value={messageText}
              placeholder={"Type your message"}
              onChange={onInputChange}
              name={"message"}
            />
          </Form>
        </InputCont>
      </>
    )}
  </Container>
);

export default ChatPresenter;
