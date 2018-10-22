import React, { ChangeEventHandler, Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddPlacePresenter from "./AddPlacePresenter";

interface IState {
  address: string;
  name: string;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceContainer extends Component<IProps, IState> {
  public state = {
    address: "",
    lat: 1.23,
    lng: 2.34,
    name: ""
  };
  public render() {
    const { address, name } = this.state;
    return (
      <AddPlacePresenter
        onInputChange={this.onInputChange}
        address={address}
        name={name}
        loading={false}
      />
    );
  }

  public onInputChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default AddPlaceContainer;
