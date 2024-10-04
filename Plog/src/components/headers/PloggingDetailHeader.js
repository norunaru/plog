import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import leftIcon from '../../../assets/icons/ic_back.png';
import menyIcon from '../../../assets/icons/meny.png';

const PloggingDetailHeader = ({navigation, headerText}) => {
  return (
    <SafeAreaView style={styles.headerWrap}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={leftIcon} style={styles.left} />
      </Pressable>
      <Text style={styles.headerText}>
        {headerText}
      </Text>
      {/* 수정해야함  */}
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={menyIcon} style={styles.meny} />
      </Pressable>
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
  left: {
    width: 24,
    height: 24,
  },
  meny: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: 'black',
    fontSize: 17,
    height: '100%',
    fontWeight: 'semiBold',
    textAlign: 'center',   
    flex: 1,
    lineHeight: 45,
    marginLeft: -10,
  },
});

export default PloggingDetailHeader;
