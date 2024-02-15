import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex justify-center items-center my-5 space-y-3">
        <ImageBackground source={require('../assets/images/empty.png')} className="w-36 h-36 shadow" />
        <Text className="font-bold text-gray-400">{ message || 'Data not found'}</Text>
    </View>
  )
}