import React, { Component } from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { getRide, getRideVariables } from "types/api";
import RidePresenter from "./RidePresenter";
import { GET_RIDE } from "./RideQueries.queries";

class RideQuery extends Query<getRide, getRideVariables> {}
interface IProps extends RouteComponentProps<any> {}

class RideContainer extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }
  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    return (
      <RideQuery query={GET_RIDE} variables={{ rideId }}>
        {data => <RidePresenter data={data} />}
      </RideQuery>
    );
  }
}

export default RideContainer;
