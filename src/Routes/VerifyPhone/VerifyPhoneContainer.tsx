import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneContainer extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
  }

  public render() {
    return <VerifyPhonePresenter />;
  }
}

export default VerifyPhoneContainer;
