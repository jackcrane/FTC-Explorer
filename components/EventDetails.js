import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, ScrollView, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';
import EventEl from '../components/Event.js';
import { FIRST_API_KEY } from '../Secrets.js';
import styles from "../components/Styles";

const EventDetails = (props) => {
  const [isEventLoading, setEventLoading] = useState(true);
  const [isrankingLoading, setrankingLoading] = useState(true);
  const [eventData, setEventData] = useState({});
  const [rankingData, setrankingData] = useState({});

  const season_year = 2020

  useEffect(() => {
    fetch(`https://ftc-api.firstinspires.org/v2.0/${props.seasonYear}/events/?eventCode=${props.eventCode}`, {
      headers: {Authorization: `Basic ${FIRST_API_KEY}`}
    })
      .then((response) => response.json())
      .then((json) => setEventData(json))
      .catch((error) => console.error(error))
      .finally(() => setEventLoading(false))
  }, []);

  useEffect(() => {
    fetch(`https://ftc-api.firstinspires.org/v2.0/${props.seasonYear}/rankings/${props.eventCode}`, {
      headers: {Authorization: `Basic ${FIRST_API_KEY}`}
    })
      .then((response) => response.json())
      .then((json) => setrankingData(json))
      .catch((error) => console.error(error))
      .finally(() => setrankingLoading(false))
  }, []);

  return (
    <View style={styles.body}>
      <StatusBar barStyle='dark-content' />
      {(isEventLoading) ? <ActivityIndicator /> : (
        <ScrollView style={styles.containernotop} endFillColor={'black'} scrollIndicatorInsets={{ right: 1 }}>
          <View style={styles.containerBody}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{eventData.events[0].name}</Text>
              <Text style={styles.subtitle}>Event Information</Text>
              <View style={styles.titleUnderline}></View>
          </View>
            <View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Event Name</Text>
                <Text style={styles.detailsContent}>{eventData.events[0].name}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Event Type</Text>
                <Text style={styles.detailsContent}>{eventData.events[0].remote ? 'Remote' : 'In-Person'}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Location</Text>
                <Text style={styles.detailsContent}>{eventData.events[0].city}, {eventData.events[0].stateprov}, {eventData.events[0].country}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Address</Text>
                <Text style={styles.detailsContent}>{eventData.events[0].address}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Date</Text>
                <Text style={styles.detailsContent}>{new Date(eventData.events[0].dateStart).toDateString()} to {new Date(eventData.events[0].dateEnd).toDateString()} ({eventData.events[0].timezone})</Text>
              </View>

              {(function() {
                if((eventData.events[0].website ?? 'n') == 'n') {
                  return (
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailsTitle}>Website</Text>
                      <Text style={styles.detailsContent}>{eventData.events[0].website}</Text>
                    </View>
                  )
                }
              })()}
            </View>
            <Text style={styles.subtitle}>Teams</Text>
            <View style={styles.titleUnderline}></View>
            {!eventData.events[0].published ? (<Text style={styles.oops}>Team information for this tournament is unavailible.</Text>) : (
              <View>
                {(typeof rankingData.Rankings != 'object') ? (<ActivityIndicator />) : (
                  <View>
                    <Text style={styles.oops}>Teams are ordered by rank</Text>
                    <Text style={styles.teamNumber}>
                      Number
                      <Text style={styles.supporting}>- Total RP - Top Score</Text>
                    </Text>
                    {rankingData.Rankings.map((o, i) => (
                      <View style={styles.teamContainer} key={i}>
                        <Text style={styles.teamNumber}>
                          <Text style={styles.supporting}>{i + 1} </Text>
                          {o.teamNumber}
                          <Text style={styles.supporting}>- {o.sortOrder1} - {o.sortOrder6}</Text></Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
            <Text style={styles.tif}>Event code {props.eventCode}</Text>
            <Text style={styles.tif}>Thats it folks!</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default EventDetails;
