import React, { ChangeEventHandler, Component } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { verifyPhone, verifyPhoneVariables } from "types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries.queries";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  key: string;
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends Component<IProps, IState> {
  public state = {
    key: ""
  };
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }

  public render() {
    const { key } = this.state;
    return (
      <VerifyMutation mutation={VERIFY_PHONE} variables={}>
        {" "}
        6:30
        <VerifyPhonePresenter onChange={this.onInputChange} key={key} />
      </VerifyMutation>
    );
  }

  public onInputChange: ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;
