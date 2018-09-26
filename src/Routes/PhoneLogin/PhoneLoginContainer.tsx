import React, { ChangeEventHandler, Component, FormEventHandler } from "react";
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
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
    );
  }

  public onInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    // tslint:disable-next-line
    console.log(countryCode, phoneNumber);
  };
}

export default PhoneLoginContainer;
