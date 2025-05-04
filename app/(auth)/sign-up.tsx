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
import SERVER_ADDRESS from "@/config";
import Toast from "react-native-toast-message";
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
  const [signType, setSignType] = useState<string>("");
  const [phone, setPhoneNo] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [availableDegrees, setAvailableDegrees] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const universities = [
    "NSBM Green University",
    "University of Plymouth",
    "Victoria University",
    "Other",
  ];

  const intakes = ["22.1", "22.2", "23.1", "23.2", "24.1", "24.2"];

  const faculties = [
    "Faculty of Computing",
    "Faculty of Business",
    "Faculty of Engineering",
    "Faculty of Science",
  ];

  const userTypes = ["Student", "Lecturer"];

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data", error);
    }
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one capital letter");
      return false;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateEmail = (email: string): boolean => {
    if (!email.endsWith("@students.nsbm.ac.lk")) {
      setEmailError("Email must end with @students.nsbm.ac.lk");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSignIn = async () => {
    // Validate password and email before proceeding
    const isPasswordValid = validatePassword(password);
    const isEmailValid = validateEmail(mail);

    if (!isPasswordValid) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Password Error",
        text2: passwordError,
      });
      return;
    }

    if (!isEmailValid) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Email Error",
        text2: emailError,
      });
      return;
    }

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
    setDegree(""); // Reset degree when faculty changes

    switch (faculty) {
      case "Faculty of Computing":
        setAvailableDegrees([
          "Computer Science",
          "Data Science",
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

  // Radio Button Component
  const RadioButton = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
        <View style={[styles.radioCircle, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInnerCircle} />}
        </View>
        <CustomText style={styles.radioLabel}>{label}</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        <Image
          source={require("../../assets/images/nsbm_logo.png")}
          style={styles.logo}
        />
        <CustomText style={styles.title}>Sign Up</CustomText>

        <View style={styles.form}>
          <CustomText style={styles.label}>Full Name</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter Name Here"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <CustomText style={styles.label}>Student ID</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter ID Here"
            value={studentid}
            onChangeText={setStudentId}
            autoCapitalize="none"
          />

          <CustomText style={styles.label}>NSBM Email</CustomText>
          <TextInput
            style={styles.input}
            placeholder="someone@students.nsbm.ac.lk"
            value={mail}
            onChangeText={(text) => {
              setMail(text);
              if (text.length > 0) {
                validateEmail(text);
              } else {
                setEmailError("");
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <CustomText style={styles.errorText}>{emailError}</CustomText>
          ) : null}

          <CustomText style={styles.label}>Password</CustomText>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.length > 0) {
                validatePassword(text);
              } else {
                setPasswordError("");
              }
            }}
            autoCapitalize="none"
          />
          {passwordError ? (
            <CustomText style={styles.errorText}>{passwordError}</CustomText>
          ) : null}

          <CustomText style={styles.label}>Intake</CustomText>
          <View style={styles.radioGroup}>
            {intakes.map((item) => (
              <RadioButton
                key={item}
                label={item}
                selected={intake === item}
                onPress={() => setIntake(item)}
              />
            ))}
          </View>

          <CustomText style={styles.label}>Faculty</CustomText>
          <View style={styles.radioGroup}>
            {faculties.map((item) => (
              <RadioButton
                key={item}
                label={item}
                selected={faculty === item}
                onPress={() => handleFacultyChange(item)}
              />
            ))}
          </View>

          <CustomText style={styles.label}>Degree</CustomText>
          <View style={styles.radioGroup}>
            {availableDegrees.length > 0 ? (
              availableDegrees.map((degreeOption) => (
                <RadioButton
                  key={degreeOption}
                  label={degreeOption}
                  selected={degree === degreeOption}
                  onPress={() => setDegree(degreeOption)}
                />
              ))
            ) : (
              <CustomText style={styles.noOptionsText}>
                No Degrees Available
              </CustomText>
            )}
          </View>

          <CustomText style={styles.label}>Offering University</CustomText>
          <View style={styles.radioGroup}>
            {universities.map((uni) => (
              <RadioButton
                key={uni}
                label={uni}
                selected={university === uni}
                onPress={() => setUniversity(uni)}
              />
            ))}
          </View>

          <CustomText style={styles.label}>NIC</CustomText>
          <TextInput
            style={styles.input}
            placeholder="Enter NIC Here"
            value={nic}
            onChangeText={setNic}
            autoCapitalize="characters"
          />

          <CustomText style={styles.label}>Phone Number</CustomText>
          <TextInput
            style={styles.input}
            placeholder="+94"
            value={phone}
            onChangeText={setPhoneNo}
            keyboardType="phone-pad"
          />

          <CustomText style={styles.label}>User Type</CustomText>
          <View style={styles.radioGroup}>
            {userTypes.map((type) => (
              <RadioButton
                key={type}
                label={type}
                selected={signType === type}
                onPress={() => setSignType(type)}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={handleSignIn}
            >
              <CustomText style={styles.buttonText}>Sign Up</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFD9AF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 108,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 44,
    fontWeight: "200",
    color: "#ffffff",
    marginVertical: 20,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  radioGroup: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelected: {
    borderColor: "#39B54A",
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#39B54A",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  noOptionsText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  signInButton: {
    backgroundColor: "#39B54A",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
});

export default SignUpScreen;
