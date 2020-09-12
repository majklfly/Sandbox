import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import Firebase from "./firebase";

const LOCATION_TASK_NAME = "background-location-task";

const db = Firebase.firestore();

export default function App() {
  const startRunning = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      console.log("started");
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
      });
    }
  };

  const getTasks = async () => {
    const tasks = await TaskManager.getRegisteredTasksAsync();
    console.log(tasks);
  };

  const fetchData = () => {
    const data = db
      .collection("locations")
      .get()
      .then(function (query) {
        if (!query.empty) {
          query.forEach(function (doc) {
            console.log(doc.data());
          });
        }
      });
  };

  fetchData();

  return (
    <View style={styles.container}>
      <Text>Firestore is in the test mode!!</Text>
      <TouchableOpacity style={styles.button} onPress={() => startRunning()}>
        <Text>Enable background Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => getTasks()}>
        <Text>Get Tasks</Text>
      </TouchableOpacity>
      <View style={{ height: 400, marginTop: 10 }}>
        <ScrollView style={styles.scrollViewContainer}></ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  scrollViewContainer: {
    width: 300,
    backgroundColor: "lightblue",
  },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    db.collection("locations").doc("location").set({
      value: locations[0],
    });
  }
});
