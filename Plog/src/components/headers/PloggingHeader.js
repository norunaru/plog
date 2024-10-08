import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import chevronLeft from '../../../assets/icons/ic_back.png';

const PloggingHeader = ({navigation, headerText}) => {
  return (
    <SafeAreaView style={styles.headerWrap}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backWrap}>
        <Image source={chevronLeft} style={styles.chevron} />
      </Pressable>
      <Text style={styles.headerText}>
        {headerText}
      </Text>
      <View style={styles.boxWrap} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    width: '100%',
    height: 60,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E8E8E8',
  },
  chevron: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    height: '100%',
    fontWeight: 'semiBold',
    textAlign: 'center',   
    flex: 1,
    lineHeight: 45,
    marginLeft: -10,
  },
  backWrap: {
    width: responsiveWidth(12),
    height: responsiveHeight(4),
    justifyContent: 'center',
  },
  boxWrap: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    justifyContent: 'center',
  },
});

export default PloggingHeader;
