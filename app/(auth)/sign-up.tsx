import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import CustomText from "@/components/CustomText";
import { Picker } from "@react-native-picker/picker";
import SERVER_ADDRESS from "@/config";
import Toast from "react-native-toast-message"; // Add Toast library
import { Stack, router } from "expo-router";

interface Credentials {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  user_type: string;
  student_id: string;
  intake: string;
  degree: string;
  university: string;
  nic: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

const SignUpScreen: React.FC = () => {
  const [mail, setMail] = useState<string>("");
  const [studentid, setStudentId] = useState<string>("");
  const [intake, setIntake] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [nic, setNic] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signType, setSignType] = useState<string>("Student");
  const [phone, setPhoneNo] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [availableDegrees, setAvailableDegrees] = useState<string[]>([]);

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data", error);
    }
  };

  const handleSignIn = async () => {
    const currentDateTime = new Date().toISOString();
    const credentials: Credentials = {
      full_name: name,
      email: mail,
      password: password,
      phone_number: phone,
      user_type: signType,
      student_id: studentid,
      intake: intake,
      degree: degree,
      university: university,
      nic: nic,
      profile_picture:
        "https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png",
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };

    try {
      const response = await fetch(`${SERVER_ADDRESS}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 409) {
        router.push("/(auth)/sign-in");
        throw new Error("User Already Exists");
      }

      if (!response.ok) {
        throw new Error("Registration Failed");
      }

      const data = await response.json();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Registration Successful !",
      });
      storeData("apiKey", data.access_token);
      storeData("full_name", name);
      storeData("email", mail);
      storeData("phone_number", phone);
      storeData("user_type", signType);
      storeData("password", password);

      router.push("/"); // Navigate to the next screen after successful login
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Sign Up Failed",
        text2: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const handleFacultyChange = (faculty: string) => {
    setFaculty(faculty);

    switch (faculty) {
      case "Faculty of Computing":
        setAvailableDegrees([
          "Computer Science",
          "Computer Networks",
          "Computer Security",
          "Software Engineering",
        ]);
        break;
      case "Faculty of Business":
        setAvailableDegrees([
          "Business Management",
          "Logistics",
          "Business Analytics",
        ]);
        break;
      case "Faculty of Engineering":
        setAvailableDegrees([
          "Computer System Engineering",
          "Civil Engineering",
          "Mechanical Engineering",
          "Mechatronics Engineering",
        ]);
        break;
      case "Faculty of Science":
        setAvailableDegrees([
          "Nursing",
          "BMS",
          "Food and Nutrition",
          "Psychology",
        ]);
        break;
      default:
        setAvailableDegrees([]);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require("../../assets/images/nsbm_logo.png")}
        style={styles.logo}
      />
      <CustomText style={styles.title}>Sign Up</CustomText>

      <View style={styles.form}>
        <ScrollView>
          <CustomText style={styles.label}>Full Name: </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter Name Here"
            value={name}
            onChangeText={setName}
          />

          <CustomText style={styles.label}>Student ID: </CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter ID Here"
            value={studentid}
            onChangeText={setStudentId}
          />

          <CustomText style={styles.label}>NSBM Email</CustomText>
          <TextInput
            style={styles.input}
            placeholder="someone@students.nsbm.ac.lk"
            value={mail}
            onChangeText={setMail}
          />

          <CustomText style={styles.label}>Password</CustomText>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <CustomText style={styles.label}>Enter Intake Value: </CustomText>
          <Picker
            selectedValue={intake}
            onValueChange={(itemValue) => setIntake(itemValue)}
            style={styles.picker}
          >
            {["22.1", "22.2", "23.1", "23.2", "24.1", "24.2", "24.3"].map(
              (item) => (
                <Picker.Item key={item} label={item} value={item} />
              ),
            )}
          </Picker>

          <CustomText style={styles.label}>Faculty</CustomText>
          <Picker
            selectedValue={faculty}
            onValueChange={(itemValue) => handleFacultyChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item
              label="Faculty of Computing"
              value="Faculty of Computing"
            />
            <Picker.Item
              label="Faculty of Business"
              value="Faculty of Business"
            />
            <Picker.Item
              label="Faculty of Engineering"
              value="Faculty of Engineering"
            />
            <Picker.Item
              label="Faculty of Science"
              value="Faculty of Science"
            />
          </Picker>

          <CustomText style={styles.label}>Enter Your Degree:</CustomText>
          <Picker
            selectedValue={degree}
            onValueChange={(itemValue) => setDegree(itemValue)}
            style={styles.picker}
          >
            {availableDegrees.map((degreeOption) => (
              <Picker.Item
                key={degreeOption}
                label={degreeOption}
                value={degreeOption}
              />
            ))}
          </Picker>

          <CustomText style={styles.label}>Offering University:</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter University Name Here"
            value={university}
            onChangeText={setUniversity}
          />

          <CustomText style={styles.label}>Enter Your NIC:</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter NIC Here"
            value={nic}
            onChangeText={setNic}
          />

          <CustomText style={styles.label}>Phone Number</CustomText>
          <TextInput
            style={styles.input}
            placeholder="+94"
            value={phone}
            onChangeText={setPhoneNo}
          />

          <CustomText style={styles.label}>
            Are you a Student or a Lecturer?
          </CustomText>
          <Picker
            selectedValue={signType}
            onValueChange={(itemValue) => setSignType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Student" value="Student" />
            <Picker.Item label="Lecturer" value="Lecturer" />
          </Picker>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={handleSignIn}
            >
              <CustomText style={styles.buttonText}>Sign Up</CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFD9AF",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: 250,
    height: 108,
    resizeMode: "contain",
  },
  title: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 44,
    fontWeight: "200",
    color: "#ffffff",
    marginVertical: 10,
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    marginBottom: 0,
    elevation: 0,
  },
  label: {
    fontSize: 15,
    color: "#888",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 10,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "200",
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  signInButton: {
    backgroundColor: "#39B54A",
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default SignUpScreen;
