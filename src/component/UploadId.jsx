import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const truncateFileName = (fileName, maxLength = 20) => {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExt.substring(0, maxLength - 4); // -4 to account for "..." and some of the extension
  return `${truncatedName}...${extension}`;
};

const UploadId = () => {
  const navbtn = useNavigation();
  const [idType, setIdType] = useState('');
  const [showIdModal, setShowIdModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleIdSelect = (selectedId) => {
    setIdType(selectedId);
    setShowIdModal(false);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'], // Accept PDFs and images
        copyToCacheDirectory: false,
      });

      if (result.assets && result.assets[0]) {
        setSelectedDocument(result.assets[0]);
        // You can add upload logic here
        // handleUpload(result.assets[0]);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', gap:20}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'90%', marginBottom: 20}}>
        <TouchableOpacity  hitSlop={40} onPress={() => navbtn.goBack()}>
          <FontAwesomeIcon name="arrow-left" size={24} color="#4635E2" />
        </TouchableOpacity>
      </View>

      <Text style={{fontSize: 30, fontWeight: '600', color: '#33196B'}}>Upload ID</Text>
      <Text style={{fontSize: 12, fontWeight: '500', color: '#645290', width: '80%',textAlign:'center'}}>
        We strongly give full freedom to our users, but to avoid any kind of mishap & nuisance we recommend you to provide a ID proof for safety & security
      </Text>
      
      <View style={{ position: 'relative', width: '80%' }}>
        <TextInput
          placeholder='ID Proof'
          placeholderTextColor={'#33196B'}
          style={{
            borderWidth: 1,
            borderColor: '#8A52F3',
            width: '100%',
            padding: 13,
            borderRadius: 20,
            paddingRight: 50
          }}
          value={idType}
          editable={false}
        />
        <TouchableOpacity  hitSlop={40}
          onPress={() => setShowIdModal(true)}
          style={{
            position: 'absolute',
            right: 20,
            top: 10,
          }}
        >
          <AntIcon name="caretdown" size={24} color="#8A52F3" />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showIdModal}
          onRequestClose={() => setShowIdModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowIdModal(false)}>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableWithoutFeedback>
                <View style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 20,
                  width: '90%',
                  maxWidth: 400,
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                    paddingHorizontal: 10,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: '#33196B',
                    }}>Select ID Type</Text>
                    <TouchableOpacity onPress={() => setShowIdModal(false)}>
                      <Text style={{
                        fontSize: 16,
                        color: '#8A52F3',
                        fontWeight: '600',
                      }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    gap: 15,
                  }}>
                    {['ID Proof', 'NIN Proof', 'Passport Proof'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => handleIdSelect(type)}
                        style={{
                          padding: 15,
                          borderRadius: 12,
                          backgroundColor: idType === type ? '#8A52F3' : '#F5F5F5',
                        }}
                      >
                        <Text style={{
                          fontSize: 16,
                          color: idType === type ? 'white' : '#33196B',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      <TouchableOpacity 
        onPress={pickDocument}
        style={{
          width: '80%',
          height: '30%',
          backgroundColor: '#F5F5F5',
          borderRadius: 20,
          borderColor: '#8A52F3',
          borderWidth: 2,
          borderStyle: 'dashed',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10
        }}>
        <Image 
          source={require('../assets/uploadpic.png')} 
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain'
          }}
        />
        {selectedDocument ? (
          <Text style={{fontSize: 12, fontWeight: '600', color: '#7B49FF'}}>
            {truncateFileName(selectedDocument.name)}
          </Text>
        ) : (
          <Text style={{fontSize: 16, fontWeight: '600', color: '#7B49FF'}}>
            Upload Document
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ opacity: selectedDocument ? 1 : 0 }}
        disabled={!selectedDocument}

        onPress={() => navbtn.navigate('Location')} // Replace 'NextScreen' with your actual next screen
      >
        <LinearGradient
          colors={['#FA457E', '#7B49FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingHorizontal: 26, paddingVertical: 15, borderRadius: 20, marginTop: 20}}
        >
          <Text style={{ fontSize: 17, fontWeight: '500', color: '#fff' }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default UploadId