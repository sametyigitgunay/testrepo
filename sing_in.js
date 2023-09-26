import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Permissions } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [TCId, setTCId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([{ name: '', details: '' }]); 
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    AsyncStorage.setItem('fullName', fullName);
    AsyncStorage.setItem('selectedCountry', selectedCountry);
    AsyncStorage.setItem('selectedCity', selectedCity);
    AsyncStorage.setItem('TCId', TCId);
    AsyncStorage.setItem('phoneNumber', phoneNumber);
    AsyncStorage.setItem('birthDate', birthDate);
    AsyncStorage.setItem('gender', gender);
    AsyncStorage.setItem('employmentStatus', employmentStatus);
    AsyncStorage.setItem('occupation', occupation);
    AsyncStorage.setItem('educationLevel', educationLevel);
    AsyncStorage.setItem('schoolName', schoolName);
    AsyncStorage.setItem('department', department);
    AsyncStorage.setItem('graduationYear', graduationYear);
    AsyncStorage.setItem('skills', JSON.stringify(skills));
    AsyncStorage.setItem('password', password);
    AsyncStorage.setItem('kvkkAccepted', kvkkAccepted.toString());
  }, [fullName, selectedCountry, selectedCity, TCId, phoneNumber, birthDate, gender, employmentStatus, occupation, educationLevel, schoolName, department, graduationYear, skills, password, kvkkAccepted]);



  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryData = data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        })).sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryData); 
      })
      .catch((error) => console.error('API hatası:', error));
  }, []);

  const handleAddProject = () => {
    const newProjects = [...projects, { name: '', details: '' }];
    setProjects(newProjects);
  };

  const handleProjectNameChange = (text, index) => {
    const newProjects = [...projects];
    newProjects[index].name = text;
    setProjects(newProjects);
  };

  const handleProjectDetailsChange = (text, index) => {
    const newProjects = [...projects];
    newProjects[index].details = text;
    setProjects(newProjects);
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKvkkAccept = () => {
    setKvkkAccepted(true);
  };

  const handleRegistration = async () => {
    try {
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('selectedCountry', selectedCountry);
      await AsyncStorage.setItem('selectedCity', selectedCity);
      await AsyncStorage.setItem('TCId', TCId);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('birthDate', birthDate);
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('employmentStatus', employmentStatus);
      await AsyncStorage.setItem('occupation', occupation);
      await AsyncStorage.setItem('educationLevel', educationLevel);
      await AsyncStorage.setItem('schoolName', schoolName);
      await AsyncStorage.setItem('department', department);
      await AsyncStorage.setItem('graduationYear', graduationYear);
      await AsyncStorage.setItem('skills', JSON.stringify(skills));
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('kvkkAccepted', kvkkAccepted.toString());

      alert('Kayıt İşlemi Başarılı');

    } catch (error) {
      alert('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', error);
    }
  };


  return (
    <NavigationContainer>
      <ScrollView>
        <View style={{ backgroundColor: 'gray', paddingTop: 40, paddingBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
            Kullanıcı Kaydı
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          
          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Ad Soyad:</Text>
          <TextInput
            placeholder="Ad Soyad"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Ülke Seçin:</Text>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            style={{
              width: '100%',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          >
            <Picker.Item label="Ülke Seçin" value="" />
            {countries.map((country) => (
              <Picker.Item key={country.value} label={country.label} value={country.value} />
            ))}
          </Picker>
      
          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>İl/Şehir:</Text>
          <TextInput
            placeholder="İl/Şehir"
            value={selectedCity}
            onChangeText={(text) => setSelectedCity(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>TC Kimlik No:</Text>
          <TextInput
            placeholder="TC Kimlik No"
            value={TCId}
            onChangeText={(text) => setTCId(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Telefon:</Text>
          <TextInput
            placeholder="Telefon"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Doğum Tarihi:</Text>
          <TextInput
            placeholder="Doğum Tarihi"
            value={birthDate}
            onChangeText={(text) => setBirthDate(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Cinsiyet:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={{
              width: '100%',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          >
            <Picker.Item label="Cinsiyet Seçin" value="" />
            <Picker.Item label="Erkek" value="Erkek" />
            <Picker.Item label="Kadın" value="Kadın" />
          </Picker>

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Çalışma Durumu:</Text>
          <Picker
            selectedValue={employmentStatus}
            onValueChange={(itemValue) => setEmploymentStatus(itemValue)}
            style={{
              width: '100%',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          >
            <Picker.Item label="Çalışma Durumu Seçin" value="" />
            <Picker.Item label="Öğrenci" value="Öğrenci" />
            <Picker.Item label="Çalışan" value="Çalışan" />
            <Picker.Item label="İşsiz" value="İşsiz" />
          </Picker>

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Meslek:</Text>
          <TextInput
            placeholder="Meslek"
            value={occupation}
            onChangeText={(text) => setOccupation(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Eğitim Seviyesi:</Text>
          <Picker
            selectedValue={educationLevel}
            onValueChange={(itemValue) => setEducationLevel(itemValue)}
            style={{
              width: '100%',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          >
            <Picker.Item label="Eğitim Seviyesi Seçin" value="" />
            <Picker.Item label="İlkokul" value="İlkokul" />
            <Picker.Item label="Lise" value="Lise" />
            <Picker.Item label="Üniversite" value="Üniversite" />
          </Picker>

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Okul Bilgileri:</Text>
          <TextInput
            placeholder="Okul Adı"
            value={schoolName}
            onChangeText={(text) => setSchoolName(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />
          <TextInput
            placeholder="Bölüm"
            value={department}
            onChangeText={(text) => setDepartment(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />
          <TextInput
            placeholder="Mezuniyet Yılı"
            value={graduationYear}
            onChangeText={(text) => setGraduationYear(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Yetkinlik Dereceleri:</Text>
          <TextInput
            placeholder="Yetkinlik ve Derece"
            value={skills}
            onChangeText={(text) => setSkills(text)}
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: 'gray',
              paddingVertical: 4,
              textAlignVertical: "center",
              marginTop: 15
            }}
          />


          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Şifre:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: 'gray', paddingVertical: 4, marginTop: 15 }}>
            <TextInput
              secureTextEntry={!showPassword} 
              placeholder="Şifre"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                flex: 1, 
                textAlignVertical: 'center',
              }}
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Text style={{ paddingHorizontal: 10 }}>{showPassword ? 'Gizle' : 'Göster'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>Projeler:</Text>
          {projects.map((project, index) => (
            <View key={index}>
              <TextInput
                placeholder="Proje Adı"
                value={project.name}
                onChangeText={(text) => handleProjectNameChange(text, index)}
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'gray',
                  paddingVertical: 4,
                  textAlignVertical: "center",
                  marginTop: 15
                }}
              />
              <TextInput
                placeholder="Proje Detayları"
                value={project.details}
                onChangeText={(text) => handleProjectDetailsChange(text, index)}
                style={{
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'gray',
                  paddingVertical: 4,
                  textAlignVertical: "center",
                  marginTop: 15
                }}
              />
              <Button style={{ marginTop: 15 }} title="Proje Sil" onPress={() => handleRemoveProject(index)} />
            </View>
          ))}
          <View style={{ marginTop: 15 }}>
            <Button title="Proje Ekle" onPress={handleAddProject} />
          </View>


          <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: 'bold', marginTop: 15 }}>KVKK Onayı:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={kvkkAccepted}
              onValueChange={(value) => setKvkkAccepted(value)}
            />
            <Text>KVKK Onaylıyorum</Text>
          </View>
          <Button
            title="Kayıt Ol"
            disabled={!kvkkAccepted}
            onPress={handleRegistration}
          />

        </View>
      </ScrollView>
    </NavigationContainer>
  );
}