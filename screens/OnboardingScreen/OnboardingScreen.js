import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as CONSTANT from '../../constant/Constant';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: CONSTANT.whiteColor,flex: 1}}>
    <Onboarding
      onSkip={() => navigation.replace('RootStackScreen')}
      onDone={() => navigation.replace('RootStackScreen')}
      pages={[
        {
          backgroundColor: CONSTANT.whiteColor,
          // backgroundColor: CONSTANT.primaryColor,
          image: (
            <Image
            style={{height: hp('82.2%'), resizeMode: 'contain'}}
            source={require('../../assets/TechnologyBlogs.png')}
            />
            ),
          },
          {
            backgroundColor: CONSTANT.whiteColor,
            // backgroundColor: CONSTANT.primaryColor,
            image: (
              <Image
              style={{height: hp('82.2%'), resizeMode: 'contain'}}
              source={require('../../assets/TravelBlogs.png')}
              />
              ),
            },
            {
              backgroundColor: CONSTANT.whiteColor,
              // backgroundColor: CONSTANT.primaryColor,
              image: (
                <Image
                style={{height: hp('82.2%'), resizeMode: 'contain'}}
                source={require('../../assets/FoodBlogs.png')}
                />
                ),
              },
              {
                backgroundColor: CONSTANT.whiteColor,
                // backgroundColor: CONSTANT.primaryColor,
                image: (
                  <Image
                  style={{height: hp('82.2%'), resizeMode: 'contain'}}
                  source={require('../../assets/FashionBlogs.png')}
                  />
                  ),
                },
              ]}
              />
              </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
