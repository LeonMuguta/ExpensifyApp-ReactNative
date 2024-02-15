import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from './screenWrapper'
import { categoryBG, colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from './EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'

const expenses = [
  {
    id: 1,
    title: 'Ate Sandwitch',
    amount: 4,
    category: 'Food'
  },
  {
    id: 2,
    title: 'Bought a Jacket',
    amount: 50,
    category: 'Shopping'
  },
  {
    id: 3,
    title: 'Watched a Movie',
    amount: 100,
    category: 'Entertainment'
  }
]

export default function TripExpenses(props) {

  const {id, place, country} = props.route.params;

  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expensesRef, where('tripID', '==', id));
    const querySnapshot = await getDocs(q);
    let data = [];

    try {
      querySnapshot.forEach(doc => {
        // console.log('Document: ----- ', doc.data());
        data.push({...doc.data(), id: doc.id});
      });
      setExpenses(data);

    } catch (err) {
      console.log(err);
    }

    // querySnapshot.forEach(doc => {
    //   data.push({...doc.data(), id: doc.id});
    // });
    // setExpenses(data);
    
  }

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [])

  return (
    <ScreenWrapper className="flex-1">
        <View className="flex-row justify-between items-center p-4 mx-2">
            <Text className={`${colors.heading} text-xl font-bold`}>{place}</Text>
            <TouchableOpacity className="p-2 px-3 bg-white border-gray-200 rounded-full" onPress={() => navigation.navigate('Home')}>
                <Text className={colors.heading}>Back</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center rounded-xl mb-4">
            <Image source={require('../assets/images/7.png')} className="w-60 h-60" />
        </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center mx-4">
          <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddExpense', {id, place, country})} className="p-2 px-3 bg-white border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 270}}>
          <FlatList 
            data={expenses}
            ListEmptyComponent={<EmptyList message={"No expenses have been added"} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicators={false}
            className="flex-1 mx-1"
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses')} >
                    <View style={{backgroundColor: categoryBG[item.category]}} className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl">
                        <View>
                            <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
                            <Text className={`${colors.heading} text-xs`}>Category: {item.category}</Text>
                        </View>
                        <View>
                            <Text className={`${colors.heading} text-xs`}>Price: $ {item.amount}</Text>
                        </View>
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