import { SubscribeToMoreOptions } from "apollo-boost";
import React, { Component } from "react";
import { Mutation, Query  } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "sharedQueries.queries";
import { getRide, getRideVariables,  updateRide, updateRideVariables, userProfile } from "types/api";
import RidePresenter from "./RidePresenter";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries.queries";

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<userProfile> {}
class RideUpdate extends Mutation<updateRide, updateRideVariables>{}
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
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery query={GET_RIDE} variables={{ rideId }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const newObject = 
                }
              };
              subscribeToMore(subscribeOptions)
              return (
                <RideUpdate mutation={UPDATE_RIDE_STATUS} refetchQueries={GET_RIDE}>
                  {updateRideFn => (
                    <RidePresenter
                      userData={userData}
                      loading={loading}
                      data={data}
                      updateRideFn={updateRideFn}
                    />
                  )}
                </RideUpdate>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
  }
}

export default RideContainer;
