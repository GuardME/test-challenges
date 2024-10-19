import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Event {
  image: string;
  date: string;
  time: string;
  title: string;
  location: string;
  status: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.date}>{event.date}, {event.time}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <TouchableOpacity
          style={[styles.status, event.status === 'Finish' ? styles.finish : styles.canceled]}
        >
          <Text style={styles.statusText}>{event.status}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  finish: {
    backgroundColor: 'green',
  },
  canceled: {
    backgroundColor: 'red',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
});

export default EventCard;
