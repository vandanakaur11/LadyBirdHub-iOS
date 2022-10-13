import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import randomblog from '../../assets/randomblog.png';
import Banner from '../../Banner';
import Header from '../../components/Header';
import CategoriesHeader from '../../components/CategoriesHeader';
import * as CONSTANT from '../../constant/Constant';
import {useStateValue} from '../../store/stateProvider';
import moment from 'moment';

const Home = ({navigation}) => {
  const [{blogs}] = useStateValue();
  let listViewRef;
  const pushToTop = () => {
    listViewRef.scrollToOffset({offset: 0, animated: true});
  };

  return (
    <SafeAreaView style={{backgroundColor: CONSTANT.whiteColor}}>
    <KeyboardAvoidingView enabled style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <Header navigation={navigation} />
          <CategoriesHeader navigation={navigation} />
          <View style={styles.mainContainer}>
            <View
              style={{
                left: wp('30%'),
                alignItems: 'center',
                paddingVertical: hp('0.5%'),
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AllCategories')}>
                <Text
                  style={{
                    ...styles.seeall,
                    color: CONSTANT.blackColor,
                  }}>
                  See all Categories
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                width: wp('92%'),
                paddingBottom: hp('1%'),
              }}>
              <Text style={styles.rcblogs}>{CONSTANT.RecentBlogs}</Text>
            </View>
            <View>
              {/* <Banner /> */}
            </View>
            <FlatList
              data={blogs}
              keyExtractor={(x, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              ref={ref => {
                listViewRef = ref;
              }}
              renderItem={({item, index}) => {
                const media = 'wp:featuredmedia';
                return (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Blog', {
                          id: item.id,
                          title: item.title.rendered,
                          mediaID: item.featured_media,
                          authorID: item.author,
                        })
                      }>
                      <View style={styles.card}>
                        {item?._embedded?.[media] &&
                        item?._embedded?.[media][0]?.source_url != '' ? (
                          <View style={styles.imgcontainer}>
                            <Image
                              source={{
                                uri:
                                  item?._embedded?.[media] &&
                                  item?._embedded?.[media][0]?.source_url,
                              }}
                              style={styles.image}
                            />
                          </View>
                        ) : (
                          <View style={styles.imgcontainer}>
                            <Image source={randomblog} style={styles.image} />
                          </View>
                        )}
                        <View style={styles.content}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}>
                            <View style={styles.title}>
                              <Text style={styles.titleText}>
                                {item.title.rendered
                                  .replace(/&#8211;/g, '–')
                                  .replace(/&#8216;/g, '‘')
                                  .replace(/&#8217;/g, "'")
                                  .replace(/&#8220;/g, '“')
                                  .replace(/&#8221;/g, '”')}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: wp('56%'),
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View style={{marginHorizontal: wp('0.75%')}}>
                                    <Image
                                      source={require('../../assets/stopwatch.png')}
                                      style={{
                                        height: hp('3.5%'),
                                        width: wp('3.5%'),
                                        resizeMode: 'contain',
                                        tintColor: CONSTANT.grayColor,
                                      }}
                                    />
                                  </View>
                                  <View>
                                    {moment(item.date)
                                      .fromNow()
                                      .replace(/ago/, '')[0] == 'a' ? (
                                      <Text style={styles.duration}>
                                        {moment(item.date)
                                          .fromNow()
                                          .replace(/ago/, '')
                                          .replace(
                                            moment(item.date).fromNow()[0],
                                            '1',
                                          )}
                                      </Text>
                                    ) : (
                                      <Text style={styles.duration}>
                                        {moment(item.date)
                                          .fromNow()
                                          .replace(/ago/, '')}
                                      </Text>
                                    )}
                                  </View>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      marginHorizontal: wp('0.75%'),
                                    }}>
                                    <Image
                                      source={require('../../assets/editor.png')}
                                      style={{
                                        height: hp('3.5%'),
                                        width: wp('3.5%'),
                                        resizeMode: 'contain',
                                        tintColor: CONSTANT.grayColor,
                                      }}
                                    />
                                  </View>
                                  <View>
                                    <Text style={styles.duration}>
                                      {item?._embedded.author[0].name}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            <View
              style={{
                position: 'absolute',
                zIndex: 999,
                top: hp('62%'),
                left: wp('80%'),
              }}>
              <TouchableOpacity activeOpacity={0.8} onPress={pushToTop}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/toparrow.png')}
                    style={{
                      height: hp('5%'),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CONSTANT.whiteColor,
  },

  rcblogs: {
    color: CONSTANT.blackColor,
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
  },
  seeall: {
    color: CONSTANT.primaryColor,
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  card: {
    height: hp('18%'),
    width: wp('95%'),
    backgroundColor: CONSTANT.whiteColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    marginVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  image: {
    width: wp('30%'),
    height: wp('20%'),
    resizeMode: 'contain',
    borderRadius: wp('3%'),
  },
  imgcontainer: {
    marginHorizontal: wp('2%'),
    paddingVertical: hp('0.25%'),
    width: wp('30%'),
    height: hp('15%'),
    justifyContent: 'center',
  },
  content: {
    width: wp('60%'),
    marginRight: wp('2%'),
    height: hp('15%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {},
  titleText: {
    fontSize: hp('1.7%'),
    fontWeight: 'bold',
  },
  duration: {
    fontSize: hp('1.65%'),
    fontWeight: '400',
    color: CONSTANT.grayColor,
  },
});

export default Home;
