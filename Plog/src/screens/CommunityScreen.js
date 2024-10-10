import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import TopBar from '../components/TopBar';
import {getMyPosts, getOtherPosts} from '../API/community/communityAPI';
import useStore from '../../store/store';
import CommunityPostCard from '../components/cards/CommuintyPostCard';

export default function CommunityScreen() {
  const [selectedOption, setSelectedOption] = useState('myPosts'); // 선택된 옵션 상태 관리
  const [myPosts, setMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const token = useStore(state => state.accessToken);

  const getPosts = async () => {
    const response1 = await getMyPosts(token);
    const response2 = await getOtherPosts(token);
    setMyPosts(response1 || []);
    setOtherPosts(response2 || []);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.selectBox}>
        <TouchableOpacity
          style={[
            styles.selectOption,
            selectedOption === 'myPosts'
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => setSelectedOption('myPosts')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'myPosts'
                ? styles.selectedText
                : styles.unselectedText,
            ]}>
            내가 올린 글 보기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectOption,
            selectedOption === 'friendsPosts'
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => setSelectedOption('friendsPosts')}>
          <Text
            style={[
              styles.optionText,
              selectedOption === 'friendsPosts'
                ? styles.selectedText
                : styles.unselectedText,
            ]}>
            친구가 올린 글 보기
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.postWrap}>
        {selectedOption === 'myPosts' ? (
          myPosts.length == 0 ? (
            <View style={styles.emptyView}>
              <Text style={{textAlign: 'center'}}>
                공유된 사진이 없어요. {'\n'} 사진을 공유해보세요
              </Text>
            </View>
          ) : (
            myPosts.map(post => (
              <CommunityPostCard
                key={post.activity.id}
                name={post.member.nickname}
                profile={post.member.profileImageUrl}
                expLevel={post.member.expLevel}
                courseName={post.activity.trail.name}
                plogTimes={post.member.floggingTime}
                memo={post.activity.review}
                images={post.activity.activityImages} // 이미지 배열로 넘겨줌
                image={post.activity.trail.image}
                title={post.activity.title}
                locationName={post.activity.locationName}
                creationDate={post.activity.creationDate.split('T')[0]}
              />
            ))
          )
        ) : otherPosts.length == 0 ? (
          <View style={styles.emptyView}>
            <Text style={{textAlign: 'center'}}>
              공유된 사진이 없어요. {'\n'} 사진을 공유해보세요
            </Text>
          </View>
        ) : (
          otherPosts.map(post => (
            <CommunityPostCard
              key={post.activity.id}
              name={post.member.nickname}
              profile={post.member.profileImageUrl}
              expLevel={post.member.expLevel}
              courseName={post.activity.trail.name}
              plogTimes={post.member.floggingTime}
              memo={post.activity.review}
              images={post.activity.activityImages} // 이미지 배열로 넘겨줌
              image={post.activity.trail.image}
              title={post.activity.title}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  selectBox: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  selectOption: {
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    minHeight: 29,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'black',
  },
  selectedText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 3,
  },
  unselectedOption: {
    backgroundColor: '#F1F1F1',
  },
  unselectedText: {
    color: '#656565',
    fontSize: 12,
    marginBottom: 3,
  },
  postWrap: {
    padding: 0,
    width: '100%',
  },
  emptyView: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
