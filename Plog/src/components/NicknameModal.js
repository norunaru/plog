import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const NicknameModal = ({
  onClose,
  whiteBtnFn,
  greenBtnFn,
  boldText,
  subText,
  whiteBtnText,
  greenBtnText,
  name,
}) => {
  // 입력된 이름을 상태로 관리
  const [inputName, setInputName] = useState(name || '');

  return (
    <KeyboardAvoidingView
      style={styles.modalContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS는 'padding', Android는 'height'로 설정
    >
      {/* 배경 클릭 시 모달 닫힘 */}
      <View style={styles.blackBg} />

      {/* 모달 콘텐츠 */}
      <View style={styles.Wrap}>
        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Text style={styles.whiteText}>취소</Text>
          </Pressable>
          <Text style={styles.whiteText}>닉네임</Text>
          <Pressable>
            <Text style={styles.greenText}>확인</Text>
          </Pressable>
        </View>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            value={inputName}
            onChangeText={setInputName}
            maxLength={20}
          />
          {/* 입력된 글자 수 표시 */}
          <Text style={styles.charCount}>{`${inputName.length}/20`}</Text>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  blackBg: {
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  Wrap: {
    flex: 1,
    width: '100%',
  },
  header: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  greenText: {
    color: '#1ECD90',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  input: {
    marginBottom: 10, // 글자수 표시를 위해 여백을 조금 줌
    borderBottomColor: '#1ECD90',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  charCount: {
    color: 'white',
    textAlign: 'right', // 글자 수를 오른쪽 정렬
    marginTop: 8,
  },
});

export default NicknameModal;
