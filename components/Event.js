import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../components/Styles";

const EventEl = (props) => {
  return (
    <View style={styles.eventContainer}>
      <View style={styles.eventBullet}></View>
      <Text style={styles.eventName}>{props.name}</Text>
    </View>
  )
}

export default EventEl;
