import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, ScrollView, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';
import EventEl from '../components/Event.js';
import styles from "../components/Styles";
import { FIRST_API_KEY } from '../Secrets.js';

const Home = (props) => {
  const [isSeasonLoading, setSeasonLoading] = useState(true);
  const [isEventLoading, setEventLoading] = useState(true);
  const [seasonData, setSeasonData] = useState([]);
  const [eventData, setEventData] = useState({});

  const [searchTerm, setSearchTerm] = useState('');

  const season_year = 2020

  useEffect(() => {
    fetch(`https://ftc-api.firstinspires.org/v2.0/${season_year}`, {
      headers: {Authorization: `Basic ${FIRST_API_KEY}`}
    })
      .then((response) => response.json())
      .then((json) => setSeasonData(json))
      .catch((error) => console.error(error))
      .finally(() => setSeasonLoading(false))
  }, []);

  useEffect(() => {
    fetch(`https://ftc-api.firstinspires.org/v2.0/${season_year}/events`, {
      headers: {Authorization: `Basic ${FIRST_API_KEY}`}
    })
      .then((response) => response.json())
      .then((json) => setEventData(json))
      .catch((error) => console.error(error))
      .finally(() => setEventLoading(false))
  }, [])

  return (
    <View style={styles.body}>
      <StatusBar barStyle='dark-content' />
      {(isSeasonLoading && isEventLoading) ? <ActivityIndicator /> : (
        <ScrollView style={styles.container} endFillColor={'black'}>
          <View style={styles.containerBody}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{seasonData.gameName}℠</Text>
              <Text style={styles.subtitle}>Tournament Listing</Text>
              <View style={styles.titleUnderline}></View>
              <TextInput style={styles.input} onChangeText={setSearchTerm} placeholder='Enter a search term'/>
              <Text style={styles.inputSubtitle}>Search by name, venue, address, city, state code, or country</Text>
          </View>
            <View>
              {(typeof eventData.events != 'object') ? (<ActivityIndicator />) : (
                eventData.events.filter(o => {
                  return [
                    o.name.toLowerCase().includes(searchTerm.toLowerCase()),
                    o.venue.toLowerCase().includes(searchTerm.toLowerCase()),
                    o.address.toLowerCase().includes(searchTerm.toLowerCase()),
                    o.city.toLowerCase().includes(searchTerm.toLowerCase()),
                    o.stateprov.toLowerCase().includes(searchTerm.toLowerCase()),
                    o.country.toLowerCase().includes(searchTerm.toLowerCase())
                  ].some(v => v === true)
                }).map((o, i) =>  (
                  <TouchableOpacity key={o.code} onPress={() => {props.nav.navigate('Event Details', {eventId:o.code})}}>
                    <EventEl name={o.name} />
                  </TouchableOpacity>
                ))
              )}
            </View>
            <Text style={styles.tif}>Thats it folks!</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default Home;
