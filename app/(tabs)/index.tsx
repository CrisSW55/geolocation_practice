import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Button } from 'react-native';
import * as Location from 'expo-location';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [longitude, setLongitude] = useState("");
  const[latitude,setLatitude] = useState("");
  const weatherkey = "d01d6de9a51e8661a4d9d61c12a89372";
  const weather_APICall = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"

  
  function showLocation(){
    setLatitude(text.slice(22,32));
    setLongitude(text.slice(45,57));
  }

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
  <>

<View style={styles.container}>
    <Text style={styles.paragraph}>{text}</Text>
  </View>

   <View style={styles.container}>
    <Text style={styles.paragraph}>Latitude: {latitude}</Text>
  </View>
  <View style={styles.container}>
    <Text style={styles.paragraph}>Longitude: {longitude}</Text>
  </View>

  
  <View style={styles.container}>
  <Button
  onPress={showLocation}
  title="Click show location"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
  </View>
  </>
   
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
