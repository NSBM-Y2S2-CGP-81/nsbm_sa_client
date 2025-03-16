import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import CustomText from "@/components/CustomText";
// import { useRouter } from "expo-router";
import Toast from "react-native-toast-message"; // Add Toast library
import SERVER_ADDRESS from "@/config";
import { Link, router } from "expo-router";
import { Stack } from "expo-router";

const SignInScreen = () => {
  // const router = useRouter();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const credentials = {
      email: mail,
      password: password,
    };

    try {
      const response = await fetch(`${SERVER_ADDRESS}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      const apiKey = data.access_token;
      const full_name = data.full_name;
      const email = data.email;
      const phone_number = data.phone_number;
      const user_type = data.user_type;
      // const password = password;
      // Delete existing API key before setting the new one
      await AsyncStorage.removeItem("apiKey");

      // Store the new API key
      await AsyncStorage.setItem("apiKey", apiKey);
      await AsyncStorage.setItem("full_name", full_name);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("phone_number", phone_number);
      await AsyncStorage.setItem("user_type", user_type);
      await AsyncStorage.setItem("password", password);

      Toast.show({
        type: "success",
        position: "top",
        text1: "API Key",
        text2: apiKey,
      });
      router.replace("/");
      // console.error(apiKey);

      // router.push("/"); // Navigate to the next screen after successful login
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Login Failed",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/nsbm_logo.png")}
        style={styles.logo}
      />
      <CustomText style={styles.title}>Sign In</CustomText>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.form}>
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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={handleSignIn} // Trigger the login process
          >
            <CustomText style={styles.buttonText}>Sign In</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={() => router.replace("/(auth)/sign-up")}
          >
            <CustomText style={styles.googlebuttonText}>Sign Up</CustomText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <CustomText style={styles.forgotPassword}>
            Forgot Password?
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* Add Toast container */}
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
    marginTop: 100,
    marginBottom: 50,
    fontSize: 44,
    fontWeight: "300",
    color: "#ffffff",
    marginVertical: 10,
  },
  form: {
    backgroundColor: "#fff",
    padding: 30,
    width: "100%",
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
    fontWeight: "100",
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
  googleButton: {
    backgroundColor: "#D6E1ED",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 16,
  },
  googlebuttonText: {
    color: "#fff",
    fontWeight: "100",
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "center",
    color: "#4CAF50",
    marginTop: 15,
    fontWeight: "200",
    fontSize: 14,
  },
});

export default SignInScreen;
