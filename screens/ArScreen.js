import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import RNLocation from 'react-native-location';
import {Dimensions} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroAnimatedImage,
  ViroImage,
  ViroFlexView,
  ViroSphere,
  ViroMaterials,
  ViroAnimations,
} from '@viro-community/react-viro';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StartScreen = () => {
  ViroMaterials.createMaterials({
    earth: {
      diffuseTexture: require('../assets/earthmap1k1.jpg'),
    },
  });
  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90',
      },
    },
  });
  const [degree, setDegree] = useState('0');
  const [degreeSign, setDegreeSign] = useState('o');
  const [weatherType, setWeatherType] = useState('Mostly Cloudy');
  const [devName, setDevName] = useState('Hexa-Devs');
  const [place, setPlace] = useState('Loading');
  const [country, setCountry] = useState('India');
  const [loading, setLoading] = useState(true);
  const [iconWeather, setIconWeather] = useState(
    'cdn.weatherapi.com/weather/64x64/night/143.png',
  );
  const [date, setDate] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');

  RNLocation.configure({
    distanceFilter: 5.0,
  });

  var loc, lat, long, weatherdata;
  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
    },
  }).then(granted => {
    if (granted) {
      RNLocation.getLatestLocation({timeout: 60000}).then(latestLocation => {
        loc = latestLocation;
        lat = loc.latitude;
        long = loc.longitude;
        apireq();
      });
    }
  });

  function apireq() {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=0721412bfd6b4d7c9e4153301221004&q=${lat},${long}&aqi=no`,
    )
      .then(res => res.json())
      .then(data => {
        weatherdata = data;
        setPlace(weatherdata.location.name);
        setDegree(Math.floor(weatherdata.current.temp_c).toString());
        setWeatherType(weatherdata.current.condition.text);
        setIconWeather(`http:` + weatherdata.current.condition.icon);
        setDate(weatherdata.location.localtime);
        setWind(
          `Wind Speed : ` + weatherdata.current.wind_kph.toString() + ' kph',
        );
        setHumidity(
          `Humidity : ` + weatherdata.current.humidity.toString() + ' %',
        );
        setTimeout(function () {
          setLoading(false);
        }, 3000);
      });
  }

  function onInitialized(state, reason) {}

  return (
    <ViroARScene onTrackingUpdated={onInitialized} style={styles.box}>
      {loading ? (
        <ViroFlexView
          height={1000}
          width={1000}
          position={[0, 0, -5]}
          transformBehaviors={['billboard']}
          backgroundColor={'#000000'}
          style={styles.splashScreenbox}>
          <ViroAnimatedImage
            height={1}
            width={1}
            loop={true}
            rotation={[0, 0, 0]}
            position={[0, 0, -1]}
            source={require('../assets/spinner.gif')}
          />
        </ViroFlexView>
      ) : (
        <ViroFlexView backgroundColor={'transparent'} position={[0, 0, 0]}>
          <ViroText
            text={degree}
            scale={[1, 1, 1]}
            position={[-0.3, 0.4, -2.8]}
            outerStroke={{type: 'Outline', width: 2, color: '#000000'}}
            style={styles.helloWorldTextStyle}
          />
          <ViroText
            text={degreeSign}
            scale={[1, 1, 1]}
            position={[0.9, 0.2, -2.8]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.degreeSignStyle}
          />
          <ViroText
            text="C"
            scale={[1, 1, 1]}
            position={[0.9, -0.2, -2.8]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.degreeFormatStyle}
          />
          <ViroText
            text={weatherType}
            scale={[1, 1, 1]}
            position={[0.2, -0.9, -3]}
            width={2}
            height={1}
            maxLines={1}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.weatherTypeStyle}
          />
          <ViroText
            text={devName}
            scale={[1, 1, 1]}
            position={[-0, -3.1, -3]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.devNameStyle}
          />
          <ViroText
            text={place}
            scale={[1, 1, 1]}
            position={[1.55, 0.9, -3.4]}
            height={1}
            width={2}
            maxLines={1}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.dateStyle}
          />
          <ViroText
            text={country}
            scale={[1, 1, 1]}
            position={[1.05, 0.7, -3.4]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.dateStyle}
          />
          <ViroText
            text={date}
            scale={[1, 1, 1]}
            position={[-0.9, 1.9, -3.4]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.dateStyle}
          />
          <ViroText
            width={2}
            height={1}
            text={wind}
            scale={[1, 1, 1]}
            position={[1.8, -2.3, -3.4]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.detailsStyle}
          />
          <ViroText
            width={2}
            height={1}
            text={humidity}
            scale={[1, 1, 1]}
            position={[1.8, -2.6, -3.4]}
            outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
            style={styles.detailsStyle}
          />

          <ViroImage
            height={0.7}
            width={0.7}
            position={[1, 1.9, -3]}
            source={{
              uri: iconWeather,
            }}
          />
          <ViroImage
            height={0.3}
            width={0.3}
            position={[0.3, 1.02, -3]}
            source={require('../assets/location.png')}
          />

          <ViroImage
            height={0.2}
            width={0.2}
            position={[0.6, -1.95, -3.4]}
            // position={[5, 1.7, 0]}
            source={require('../assets/wind.png')}
          />
          <ViroImage
            height={0.2}
            width={0.2}
            position={[0.6, -2.25, -3.4]}
            source={require('../assets/humidity.png')}
          />
          <ViroSphere
            radius={0.5}
            position={[-1.8, 1.7, -5]}
            materials={['earth']}
            animation={{name: 'rotate', loop: true, run: true}}
          />
          {/* <ViroSphere
            radius={0.5}
            position={[5, 1.7, 0]}
            materials={['earth']}
            animation={{name: 'rotate', loop: true, run: true}}
          /> */}
        </ViroFlexView>
      )}
    </ViroARScene>
  );
};

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: StartScreen,
        }}
        style={styles.f1}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 100,
    color: '#ffffff',
  },
  degreeSignStyle: {
    fontSize: 28,
  },
  degreeFormatStyle: {
    fontSize: 50,
    color: '#bbe7fe',
  },
  weatherTypeStyle: {
    fontSize: 28,
    color: '#EEDCE6',
  },
  dateStyle: {
    fontSize: 18,
    color: '#EEDCE6',
  },
  devNameStyle: {
    textAlign: 'center',
  },
  detailsStyle: {
    fontSize: 18,
    color: '#D8D8F4',
  },
  container: {
    flex: 1,
  },
  loadingScreen: {
    height: windowHeight,
    width: windowWidth,
  },
  LoadingText: {
    color: 'white',
  },
  splashScreenbox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  fetchingTextStyle: {
    marginRight: windowWidth / 1.5,
    fontSize: 42,
  },
});
