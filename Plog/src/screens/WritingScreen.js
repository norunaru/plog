import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import calendar from '../../assets/icons/ic_calendar.png';
import location from '../../assets/icons/location.png';
import photoAdd from '../../assets/icons/photoAdd.png';
import distance from '../../assets/icons/distance.png';
import time from '../../assets/icons/ic_time.png';
import calorie from '../../assets/icons/ic_calorie.png';

const WritingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{padding: 20, backgroundColor: 'white', height: '100%'}}>
      <TextInput
        style={styles.textInput}
        placeholder="제목을 입력해 주세요"
        placeholderTextColor="#D9D9D9" // placeholder 색상 설정
      />
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <View style={{flexDirection: 'row', marginRight: 12}}>
          <Image style={styles.miniIcon} source={calendar} />
          <Text>2024.9.30</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.miniIcon} source={location} />
          <Text>잠실 한강 공원</Text>
        </View>
      </View>
      {/* 지도, 정보 박스 */}
      <View>
        <View style={styles.map}></View>
        <View style={styles.detail}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={distance} style={styles.icon} />
            <Text style={styles.detailBold}>총 거리</Text>
            <Text style={styles.detailThin}>3km</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={time} style={styles.icon} />
            <Text style={styles.detailBold}>총 시간</Text>
            <Text style={styles.detailThin}>2시간 15분</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={calorie} style={styles.icon} />
            <Text style={styles.detailBold}>소모 칼로리</Text>
            <Text style={styles.detailThin}>150kcal</Text>
          </View>
        </View>
      </View>
      {/* 메모 */}
      <TextInput
        placeholder="메모를 작성하세요"
        style={styles.memo}
        multiline={true} // 여러 줄 입력 가능하게 설정
        textAlignVertical="top"
      />
      <Image source={photoAdd} style={styles.icon} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 29,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          {/* "다음에 작성" 버튼 */}
          <View style={styles.whiteBtn}>
            <Text style={styles.btnText}>다음에 작성</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* "저장하기" 버튼 */}
          <View style={styles.greenBtn}>
            <Text style={styles.btnText}>저장하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WritingScreen;

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1, // 입력 필드 하단에 테두리 추가
    padding: 8,
    fontSize: 18, // 텍스트 입력 크기 조정
  },
  miniIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  map: {
    backgroundColor: '#DFE4E7',
    width: '100%',
    // flex: 1,
    height: 265,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  detail: {
    height: 142,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 20,
    justifyContent: 'space-between',
  },
  detailBold: {
    fontSize: 15,
    // fontWeight: 600,
    marginRight: 8,
    color: 'black',
  },
  detailThin: {
    fontSize: 13,
    // fontWeight: 500,
  },
  memo: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1, // 입력 필드 하단에 테두리 추가
    height: 96,
    padding: 8,
    fontSize: 18, // 텍스트 입력 크기 조정
    marginVertical: 16,
  },
  whiteBtn: {
    width: 122,
    height: 52,
    borderColor: '#1ECD90',
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
  },
  greenBtn: {
    flex: 1,
    height: 52,
    color: '#1ECD90',
    backgroundColor: '#1ECD90',
    marginRight: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
