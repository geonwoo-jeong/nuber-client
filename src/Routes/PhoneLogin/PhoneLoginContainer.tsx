import React, { ChangeEventHandler, Component, FormEventHandler } from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries";
interface IState {
  countryCode: string;
  phoneNumber: string;
}

interface IMutation {
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<any, IMutation> {}

class PhoneLoginContainer extends Component<RouteComponentProps<any>, IState> {
  public state = {
    countryCode: "+81",
    phoneNumber: ""
  };
  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
      >
        {(mutation, { loading }) => (
          <PhoneLoginPresenter
            countryCode={countryCode}
            phoneNumber={phoneNumber}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
          />
        )}
      </PhoneSignInMutation>
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
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCode}${phoneNumber}`
    );

    if (isValid) {
      return;
    } else {
      toast.error("Please write a valid phone number");
    }
  };
}

export default PhoneLoginContainer;
