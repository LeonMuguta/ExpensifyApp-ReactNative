import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import Loading from './loading'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'

export default function AddTrips() {

    const [place, setPlace] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.user);

    const navigation = useNavigation();

    const handleAddTrip = async () => {
        // Good to go
        if (place && country) {
            setLoading(true);
            let doc = await addDoc(tripsRef, {
                place,
                country,
                userID: user.uid
            });
            setLoading(false);

            if (doc && doc.id) {
                navigation.navigate('Home');
            }
            
        } else {
            // Error Message
            ToastAndroid.show("Place & country are required.", ToastAndroid.SHORT);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()}>
        <ScrollView>
        <ScreenWrapper className="flex-1 h-full">
            <View className="flex-row justify-between items-center p-4">
                <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
                <TouchableOpacity className="p-2 px-3 bg-white border-gray-200 rounded-full" onPress={() => navigation.navigate('Home')}>
                    <Text className={colors.heading}>Back</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center my-3 mt-5">
                <Image source={require("../assets/images/4.png")} className="h-72 w-72" />
            </View>
            <View className="space-y-2 mx-4">
                <Text className={`${colors.heading} text-lg font-bold`}>Where on Earth?</Text>
                <TextInput value={place} onChangeText={value => setPlace(value)}  className="p-4 bg-white rounded-full mb-3"/>
                <Text className={`${colors.heading} text-lg font-bold`}>Which Country?</Text>
                <TextInput value={country} onChangeText={value => setCountry(value)} className="p-4 bg-white rounded-full mb-3"/>
            </View>
            <View className="mx-4">
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                            <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </ScreenWrapper>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}