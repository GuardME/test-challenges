import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { EventCard } from '../../components/molecules';

 const Home = () => {
  const events = [
    {
      title: 'Tilden Park Golf Course',
      location: '10 Golf Course Dr, Berkeley, CA',
      date: 'Mon, 05 Aug',
      time: '08:30',
      image: 'https://example.com/tilden.jpg',
      status: 'Finish',
    },
    {
      title: 'Lawrence Park Golf Club',
      location: '3700 E Lake Rd, Erie, PA',
      date: 'Fri, 05 Aug',
      time: '08:30',
      image: 'https://example.com/lawrence.jpg',
      status: 'Finish',
    },
    {
      title: 'Meadow Golf Juan Yin Park',
      location: '110, Taiwan, Taipei City',
      date: 'Sat, 10 Aug',
      time: '10:30',
      image: 'https://example.com/meadow.jpg',
      status: 'Canceled',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default Home
