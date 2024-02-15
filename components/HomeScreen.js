import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from './screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from './EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'

const items = [
  {
    id: 1,
    place: 'Cape Town',
    country: 'South Africa'
  },
  {
    id: 2,
    place: 'Harare',
    country: 'Zimbabwe'
  },
  {
    id: 3,
    place: 'Manchester',
    country: 'United Kingdom'
  },
  {
    id: 4,
    place: 'Los Angeles',
    country: 'United States'
  }
]

export default function HomeScreen() {
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userID', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];

    try {
      querySnapshot.forEach(doc => {
        // console.log('Document: ----- ', doc.data());
        data.push({...doc.data(), id: doc.id});
      });
      setTrips(data);

    } catch (err) {
      console.log(err);
    }

    // querySnapshot.forEach(doc => {
    //   data.push({...doc.data(), id: doc.id});
    // });
    // setTrips(data);
    
  }

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [])
  

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border-gray-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <ImageBackground source={require('../assets/images/banner.png')} className="w-60 h-60" />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 270}}>
          <FlatList 
            data={trips}
            ListEmptyComponent={<EmptyList message={"No Trips have been added"} />}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicators={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            className="flex-1 mx-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2"/>
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}