import React, { ChangeEventHandler, Component } from "react";
import { RouteComponentProps } from "react-router";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  key: string;
}

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
    return <VerifyPhonePresenter onChange={this.onInputChange} key={key} />;
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
