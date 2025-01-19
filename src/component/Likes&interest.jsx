import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const LikesInterest = () => {
  const navbtn = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (label) => {
    setSelectedInterests((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((interest) => interest !== label);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, label];
      }
      return prevSelected;
    });
  };

    const interests = [
        { icon: <AntDesign name="camerao" size={24} color="#4635E2" />, label: 'Photography' },
        { icon: <Ionicons name="fast-food-outline" size={24} color="#4635E2" />, label: 'Cooking' },
        { icon: <Ionicons name="game-controller-outline" size={24} color="#4635E2" />, label: 'Video Games' },
        { icon: <Ionicons name="musical-notes-outline" size={24} color="#4635E2" />, label: 'Music' },
        { icon: <Ionicons name="airplane-outline" size={24} color="#4635E2" />, label: 'Travelling' },
        { icon: <Ionicons name="cart-outline" size={24} color="#4635E2" />, label: 'Shopping' },
        { icon: <Ionicons name="mic-outline" size={24} color="#4635E2" />, label: 'Speeches' },
        { icon: <Ionicons name="brush-outline" size={24} color="#4635E2" />, label: 'Art & Crafts' },
        { icon: <FontAwesome6 name="water" size={24} color="#4635E2" />, label: 'Swimming' },
        { icon: <Ionicons name="wine-outline" size={24} color="#4635E2" />, label: 'Drinking' },
        { icon: <Ionicons name="bicycle-outline" size={24} color="#4635E2" />, label: 'Sports' },
        { icon: <Ionicons name="paw-outline" size={24} color="#4635E2" />, label: 'Pet' },
      ];
 
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', gap: 20}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'90%', marginBottom: 20}}>
        <TouchableOpacity onPress={() => navbtn.goBack()}>
        <FontAwesomeIcon name="arrow-left" size={24} color="#4635E2" />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={{color:'#FB467F', fontSize:16, fontWeight:'500'}}>Skip</Text>
        </TouchableOpacity>
          </View>
          <Text style={{fontSize: 30, fontWeight: '600', color: '#33196B'}}>Likes, Interests</Text>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#645290'}}>Share your likes & passion with others</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', gap:10,flexWrap:'wrap', width: '90%'
       

          }}>
         {interests.map((interest, index) => {
          const isSelected = selectedInterests.includes(interest.label);
          return (
         
<TouchableOpacity 
 key={index}
 onPress={() => toggleInterest(interest.label)}
  style={{
    borderColor: isSelected ? '#C53E8D' : 'transparent',
    borderWidth: isSelected ? 1 : 0,
    width:'45%',
    backgroundColor: '#F5F5F5',
    borderRadius: 23, 
    padding: 13, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10,
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,}}>
  {React.cloneElement(interest.icon, { color: isSelected ? '#C53E8D' : '#4635E2' })}
          
 <Text style={{fontSize:12, fontWeight: isSelected ? '700' : '500', color:'#745594'}}>{interest.label}</Text>
</TouchableOpacity>
   );
})}
  
          </View>
          
          <TouchableOpacity onPress={() => navbtn.navigate('UploadId')}  style={{ opacity: selectedInterests.length === 3 ? 1 : 0 }}
        disabled={selectedInterests.length !== 3}>
        <LinearGradient
          colors={['#FA457E', '#7B49FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20, marginTop: 20}}>
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default LikesInterest