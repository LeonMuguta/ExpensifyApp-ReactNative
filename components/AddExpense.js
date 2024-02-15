import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/categories'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from './loading'

export default function AddExpense(props) {
    let {id} = props.route.params;

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    const handleAddExpense = async () => {
        if (title && amount && category) {
            // Good to go
            setLoading(true);
            let doc = await addDoc(expensesRef, {
              title,
              amount,
              category,
              tripID: id
            });
            setLoading(false);

            if (doc && doc.id) {
              navigation.goBack();
            }
            
        } else {
            // Error Message
            ToastAndroid.show("PLease fill out all the fields", ToastAndroid.SHORT);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()}>
        <ScrollView>
        <ScreenWrapper className="flex-1 h-full">
            <View className="flex-row justify-between items-center p-4">
                <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
                <TouchableOpacity className="p-2 px-3 bg-white border-gray-200 rounded-full" onPress={() => navigation.navigate('Home')}>
                    <Text className={colors.heading}>Back</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-center my-3 mt-5">
                <Image source={require("../assets/images/expenseBanner.png")} className="h-72 w-72" />
            </View>
            <View className="space-y-2 mx-4">
                <Text className={`${colors.heading} text-lg font-bold`}>Title</Text>
                <TextInput value={title} onChangeText={value => setTitle(value)}  className="p-4 bg-white rounded-full mb-3"/>
                <Text className={`${colors.heading} text-lg font-bold`}>Amount</Text>
                <TextInput value={amount} onChangeText={value => setAmount(value)} className="p-4 bg-white rounded-full mb-3"/>
                {/* <Text className={`${colors.heading} text-lg font-bold`}>Category</Text>
                <TextInput value={category} onChangeText={value => setCategory(value)} className="p-4 bg-white rounded-full mb-3"/> */}
            </View>
            <View className="mx-2 ml-2 space-x-2">
              <Text className="text-lg font-bold">Category</Text>
              <View className="flex-row flex-wrap items-center">
                {
                  categories.map(cat => {
                    let bgColor = 'bg-white';
                    if (cat.value === category) bgColor = 'bg-green-200'
                    return (
                      <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                        <Text>{cat.title}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
            <View className="mx-4">
                  {
                    loading ? (
                      <Loading/>
                    ) : (
                      <TouchableOpacity onPress={handleAddExpense} style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm">
                        <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
                      </TouchableOpacity>
                    )
                  }
                
            </View>
        </ScreenWrapper>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}