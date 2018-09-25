import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends Component<RouteComponentProps<any>, IState> {
  public state = {
    countryCode: "+81",
    phoneNumber: ""
  };
  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
      />
    );
  }
}

export default PhoneLoginContainer;
