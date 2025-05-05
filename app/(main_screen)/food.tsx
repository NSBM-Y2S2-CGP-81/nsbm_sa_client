import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import TopNavigationComponent from '@/components/topNavigationComponent';
import RootNavigator from '../../src/navigation/index.js';

export default function FoodScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TopNavigationComponent
        title="Food Services"
        subtitle=""
        navigateTo="/(main_screen)/service-menu"
      />
      <View style={styles.container}>
        <NavigationContainer independent={true}>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});