import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import {
  GET_TOILETS_REQUEST,
  SET_CURRENT_TOILET,
  CLEAN_UP_POSTING_SUCCESS
} from "../../reducers/toilet/actions";
import { SET_CURRENT_LOCATION } from "../../reducers/user/actions";
import MarkerComponent from "./MarkerComponent";
import Toilet from "./Toilet";

const MapComponent = props => {
  const dispatch = useDispatch();
  const { toilet, toilets, isPostingSuccess } = useSelector(
    state => state.toilet
  );
  const { location } = useSelector(state => state.user);

  //clean up isPostReviewSuccess
  useEffect(() => {
    if (isPostingSuccess) {
      dispatch({
        type: GET_TOILETS_REQUEST,
        data: location
      });
      dispatch({
        type: CLEAN_UP_POSTING_SUCCESS
      });
    }
  }, [isPostingSuccess]);

  useEffect(() => {
    if (location) {
      dispatch({
        type: GET_TOILETS_REQUEST,
        data: location
      });
    }
  }, [location]);
  const _onChangeRegion = region => {
    dispatch({
      type: SET_CURRENT_LOCATION,
      data: region
    });
  };

  const _onPressMap = () => {
    dispatch({
      type: SET_CURRENT_TOILET,
      data: null
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        onPress={_onPressMap}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        onRegionChange={_onChangeRegion}
        showsUserLocation
      >
        <MarkerComponent />
      </MapView>
      {toilet && <Toilet navi={props.navi} />}
    </View>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 }
});

export default MapComponent;
