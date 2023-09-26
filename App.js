// import { StyleSheet, Text, View , Button, TextInput, Picker, ScrollView, Image, TouchableOpacity } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import { Picker } from '@react-native-picker/picker';

// import React, { useState } from 'react';

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

// function AppBar() {
//   return (
//     <View style={{ backgroundColor: 'white', padding: 20 }}>
//       <Text style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
//         Uygulama Başlığı
//       </Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();

export default function App() {
  // const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  // const [cities, setCities] = useState([]);
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
  // const [cvFile, setCvFile] = useState(null);
  // const [cvSelected, setCvSelected] = useState(false);
  // const [cvFile, setCvFile] = useState(null);
  // const [cvSelected, setCvSelected] = useState(false);
  // const [projects, setProjects] = useState([]);
  const [projects, setProjects] = useState([{ name: '', details: '' }]); // Boş bir proje ekliyoruz
  const [password, setPassword] = useState(''); // 1. Kullanıcı şifresi
  const [showPassword, setShowPassword] = useState(false); // 1. Şifreyi gösterme kontrolü
  // const [isSubmitting, setIsSubmitting] = useState(false); // API'ye kaydetme işlemi kontrolü

  useEffect(() => {
    // Verileri cihazın lokalinde saklayın
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
    // REST Countries API'sinden ülkeleri çek
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // API'den gelen ülkeleri alfabetik olarak sırala ve ayıkla
        const countryData = data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        })).sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryData); // Verileri state'e atama
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


  // // // const getStoragePermission = async () => {
  // // //   try {
  // // //     const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  // // //     if (status === 'granted') {
  // // //       // İzin verildi, şimdi fotoğraf seçme işlemini gerçekleştirin
  // // //       handleImagePick();
  // // //     } else {
  // // //       // İzin reddedildi, kullanıcıya bilgi vermek için uygun bir mesaj gösterin
  // // //       console.warn('Depolama izni reddedildi.');
  // // //     }
  // // //   } catch (error) {
  // // //     console.error('Depolama izni alınırken hata oluştu:', error);
  // // //   }
  // // // };

  // // // const handleImagePick = async () => {
  // // //   try {
  // // //     const result = await DocumentPicker.getDocumentAsync({
  // // //       type: 'image/jpeg,image/png,image/gif',
  // // //     });

  // // //     if (result.type === 'success') {
  // // //       const { uri } = result;
  // // //       setSelectedImage(uri);
  // // //     } else if (result.type === 'cancel') {
  // // //       console.warn('Fotoğraf seçme işlemi iptal edildi.');
  // // //     } else {
  // // //       console.warn('Fotoğraf seçme işlemi sırasında bir hata oluştu.');
  // // //       console.error(result);
  // // //     }
  // // //   } catch (error) {
  // // //     console.error('Fotoğraf yükleme hatası:', error);
  // // //   }
  // // // };

  // // // const handleImagePickWithPermission = async () => {
  // // //   await getStoragePermission();
  // // //   // İzin verildiyse fotoğraf seçme işlemini başlat
  // // //   if (status === 'granted') {
  // // //     handleImagePick();
  // // //   }
  // // // };

  // // // const handleCvUploadWithPermission = async () => {
  // // //   await getStoragePermission();
  // // //   // İzin verildiyse CV yükleme işlemini başlat
  // // //   if (status === 'granted') {
  // // //     handleCvUpload();
  // // //   }
  // // // };


  const handleKvkkAccept = () => {
    setKvkkAccepted(true);
  };

  const handleRegistration = async () => {
    try {
      // Verileri cihazın lokaline kaydet
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

      // Kayıt işlemi başarılı olduğunda kullanıcıya bildirim ver
      alert('Kayıt İşlemi Başarılı');

      // React Navigation ile giriş sayfasına yönlendirme yap
      navigation.navigate("login"); // 'GirisSayfasi' doğru sayfa adınıza göre güncellenmelidir.
    } catch (error) {
      // Hata durumunda kullanıcıya hata mesajı ver
      alert('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', error);
    }
  };



  // // // const handleCvUpload = async () => {
  // // //   try {
  // // //     if (cvSelected) {
  // // //       console.warn('Zaten bir CV dosyası seçtiniz. Mevcut dosyayı silip yeni bir dosya seçebilirsiniz.');
  // // //       return;
  // // //     }

  // // //     const result = await DocumentPicker.getDocumentAsync({
  // // //       type: 'application/pdf',
  // // //     });

  // // //     if (result.type === 'success') {
  // // //       const { uri } = result;

  // // //       // Dosyanın uygulama verilerine kalıcı olarak kaydedilmesi
  // // //       const fileName = 'my_cv.pdf'; // Kaydedilecek dosyanın adı
  // // //       const newPath = `${FileSystem.documentDirectory}${fileName}`;

  // // //       await FileSystem.moveAsync({
  // // //         from: uri,
  // // //         to: newPath,
  // // //       });

  // // //       setCvFile(newPath);
  // // //       setCvSelected(true); // CV seçildi olarak işaretlenir
  // // //     } else if (result.type === 'cancel') {
  // // //       console.warn('Dosya seçme işlemi iptal edildi.');
  // // //     } else {
  // // //       console.warn('Dosya seçme işlemi sırasında bir hata oluştu.');
  // // //       console.error(result); // Hata nesnesini konsola yazdır
  // // //     }
  // // //   } catch (error) {
  // // //     console.error('CV yükleme hatası:', error);
  // // //   }
  // // // };



  // const handleCvUpload = async () => {
  //   // CV yükleme işlemleri burada olacak
  // };

  // const handleProjectNameChange = (text, index) => {
  //   // Proje adı değişikliği işlemleri burada olacak
  // };

  // const handleProjectDetailsChange = (text, index) => {
  //   // Proje detayları değişikliği işlemleri burada olacak
  // };

  // const handleAddProject = () => {
  //   // Yeni bir proje eklemek için işlemler burada olacak
  // };

  // const handleRemoveProject = (index) => {
  //   // Projeyi kaldırmak için işlemler burada olacak
  // };


  return (
    <NavigationContainer>
      <ScrollView>
        {/* <AppBar /> */}
        <View style={{ backgroundColor: 'gray', paddingTop: 40, paddingBottom: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
            Kullanıcı Kaydı
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          {/* <StatusBar style='auto' />{
          <Text>asdasdasda</Text>
        } */}
          {/* <Text>Fotoğraf Seçin:</Text>
        <TouchableOpacity onPress={handleImagePickWithPermission}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
          ) : (
            <Text>Fotoğraf Seç</Text>
          )}
        </TouchableOpacity> */}

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

          {/* <Text>İl/Şehir Seçin:</Text>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
        >
          <Picker.Item label="İl/Şehir Seçin" value="" />
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker> */}
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
              secureTextEntry={!showPassword} // Şifreyi gizlemek için
              placeholder="Şifre"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                flex: 1, // TextInput'in geri kalan boşluğu kaplamasını sağlar
                textAlignVertical: 'center',
              }}
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Text style={{ paddingHorizontal: 10 }}>{showPassword ? 'Gizle' : 'Göster'}</Text>
            </TouchableOpacity>
          </View>



          {/* <Text>CV Yükle:</Text>
        <Button title="CV Yükle" onPress={handleCvUploadWithPermission} /> */}

          {/* Proje Alanı */}
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
              // multiline={true}
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