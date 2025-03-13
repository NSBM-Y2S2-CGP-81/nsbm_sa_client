import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const UserProfile = () => {
  // Initialize states without default values, allowing user input
  const [studentId, setStudentId] = useState(""); // empty by default
  const [intake, setIntake] = useState(""); // empty by default
  const [name, setName] = useState(""); // empty by default
  const [nsbmEmail, setNsbmEmail] = useState(""); // empty by default
  const [degree, setDegree] = useState(""); // empty by default
  const [offeredBy, setOfferedBy] = useState(""); // empty by default
  const [nic, setNic] = useState(""); // empty by default
  const [email, setEmail] = useState(""); // empty by default
  const [mobile, setMobile] = useState(""); // empty by default

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>NSBM Super App</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />
          <TextInput
            style={styles.input}
            placeholder="Intake"
            value={intake}
            onChangeText={setIntake}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="NSBM Email"
            value={nsbmEmail}
            onChangeText={setNsbmEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Degree"
            value={degree}
            onChangeText={setDegree}
          />
          <TextInput
            style={styles.input}
            placeholder="Offered by"
            value={offeredBy}
            onChangeText={setOfferedBy}
          />
          <TextInput
            style={styles.input}
            placeholder="NIC/Passport"
            value={nic}
            onChangeText={setNic}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#333",
    padding: 15,
    alignItems: "center",
  },
  appTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  infoContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserProfile;
