import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

const Chat = () => {
  // Using the same users data but adding message preview and time
  const chatUsers = [
    { id: 1, name: 'John', color: '#94B3FD', isOnline: true, lastMessage: "Hey, how are you?", time: "2m ago" },
    { id: 2, name: 'Sarah', color: '#B983FF', isOnline: false, lastMessage: "Let's meet tomorrow!", time: "1h ago" },
    { id: 3, name: 'Mike', color: '#99FEDD', isOnline: true, lastMessage: "That sounds great!", time: "2h ago" },
    { id: 4, name: 'Emma', color: '#FFC7C7', isOnline: false, lastMessage: "Thanks for the help!", time: "3h ago" },
    { id: 5, name: 'Alex', color: '#87CEEB', isOnline: true, lastMessage: "See you soon!", time: "5h ago" },
    { id: 6, name: 'Lisa', color: '#FFB4B4', isOnline: false, lastMessage: "Perfect 👍", time: "1d ago" },
    { id: 7, name: 'Tom', color: '#B5F1CC', isOnline: true, lastMessage: "I'll be there", time: "1d ago" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={{ 
        padding: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
      }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: '700', 
          color: '#33196B' 
        }}>
          Messages
        </Text>
      </View>

      {/* Chat List */}
      <ScrollView>
        {chatUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={{
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}
          >
            {/* User Avatar */}
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: user.color,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
              <Text style={{ 
                color: '#fff', 
                fontSize: 20, 
                fontWeight: '500' 
              }}>
                {user.name[0]}
              </Text>
              {/* Online Status Indicator */}
              {user.isOnline && (
                <View style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: '#4CD080',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderWidth: 2,
                  borderColor: '#fff',
                }} />
              )}
            </View>

            {/* Message Content */}
            <View style={{ flex: 1 }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 4,
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: '#33196B' 
                }}>
                  {user.name}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#666' 
                }}>
                  {user.time}
                </Text>
              </View>
              <Text style={{ 
                fontSize: 14, 
                color: '#666',
                numberOfLines: 1,
              }}>
                {user.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;