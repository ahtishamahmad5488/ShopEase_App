import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const UserInfoScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.backIcon}
            source={require('../images/arrowback.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
          style={styles.profilePic}
          source={require('../images/myPic.png')}
        />
        <Text style={styles.userName}>Ahtisham Ahmad</Text>
        <Text style={styles.userTitle}>React Native Developer</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionText}>Email: ahtisham548849.com</Text>
        <Text style={styles.sectionText}>Phone: +92-3217734008</Text>
        <Text style={styles.sectionText}>Location: New York, USA</Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          <Text style={styles.skill}>React Native</Text>
          <Text style={styles.skill}>JavaScript</Text>
          <Text style={styles.skill}>Redux</Text>
          <Text style={styles.skill}>Firebase</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.sectionText}>
          Passionate mobile app developer with experience in building
          cross-platform applications using React Native. Always eager to learn
          new technologies and take on new challenges.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fac0ee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#ff6f6f',
  },
  headerTitle: {
    color: '#ff6f6f',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userTitle: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  editButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;


