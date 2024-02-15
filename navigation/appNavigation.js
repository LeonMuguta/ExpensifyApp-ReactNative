import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import AddTrips from '../components/AddTrips';
import AddExpense from '../components/AddExpense';
import TripExpenses from '../components/TripExpenses';
import WelcomeScreen from '../components/WelcomeScreen';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u => {
    console.log("Got user: ", u);
    dispatch(setUser(u));
  })

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="AddTrip" component={AddTrips} />
          <Stack.Screen options={{headerShown: false}} name="AddExpense" component={AddExpense} />
          <Stack.Screen options={{headerShown: false}} name="TripExpenses" component={TripExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignIn" component={SignIn} />
          <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  
}