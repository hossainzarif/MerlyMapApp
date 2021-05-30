import React, { useContext,useState,useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { AuthContext } from '../Providers/AuthProvider'
import { FAB } from 'react-native-paper'
import colors from '../../assets/data/colors'
import MapView ,{PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';

import Loading from '../custom/Loading'
import { Alert } from 'react-native'


const MapScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingMap, setloadingMap] = useState(false)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
     
    })();
  }, []);


  const loadCoordinates = async ()=>
  {
    try {
      setloadingMap(true)
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      
        setloadingMap(false)

      

      console.log(location)

    } catch (error) {
      setloadingMap(true)

    }
    

  }

  useEffect(() => {
    loadCoordinates()
  
  }, [])



  let text = 'Waiting..';
  if (errorMsg) {
    return <Loading />
  } else if (location) {

  return (
    <View style={styles.container}>


    
      <MapView
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                loadingEnabled={true}
                loadingIndicatorColor= {colors.primary}
                loadingBackgroundColor="#eeeeee"
                moveOnMarkerPress={false}
                showsUserLocation={true}
                showsCompass={false}
                showsPointsOfInterest={false}
                showsMyLocationButton={false}
              
                

                style={styles.mapStyle}
                region={{
                    latitude:location.coords.latitude,
                    longitude:location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                  
</MapView>

<FAB
        style={styles.fab_loc}
        small
        icon='map-marker'
        onPress={() => console.log(location.coords.latitude)}
        color={colors.white}
      />

      <FAB
        style={styles.fab}
        large
        icon='plus'
        onPress={() => navigation.navigate('PostSales')}
        color={colors.white}
      />
    </View>
  )
              }

              else{
               return <Loading/>
              }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  fab_loc: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 100,
    backgroundColor: colors.primary,
  }, fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: colors.primary,
  },
  mapStyle:{
    flex:1
  }
})
export default MapScreen
