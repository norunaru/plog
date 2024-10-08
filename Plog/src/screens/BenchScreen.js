import RecommendHeader from '../components/headers/RecommendHeader';
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import useStore from '../../store/store';
import WebView from 'react-native-webview';

export default function BenchScreen({navigation}) {
  const lat = useStore(state => state.lat); // Get user's latitude from store
  const lng = useStore(state => state.lng); // Get user's longitude from store

  // Construct the Google Maps URL with the user's latitude and longitude
  const googleMapsUrl = `https://www.google.com/maps/d/u/0/viewer?mid=10VltzAd9Sy6kz4kXI6gTlxXDNH5qU84&femb=1&ll=${lat},${lng}&z=15`;

  return (
    <View style={styles.mapView}>
      <RecommendHeader
        navigation={navigation}
        headerText={'내 주변 벤치 찾기'}
        style={styles.header}
      />
      {lat && lng ? ( // Ensure lat and lng are available before loading WebView
        <WebView
          source={{uri: googleMapsUrl}}
          style={{flex: 1}}
          renderLoading={() => (
            <ActivityIndicator
              style={styles.loading}
              size="large"
              color="#0000ff"
            />
          )}
          startInLoadingState={true} // Show loading indicator while the page loads
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  header: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#202025',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
