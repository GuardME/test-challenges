import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {EventCard} from '../../components/molecules';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // Data Available to show in card is
  // title, description, price
  // error android emulator ga tau apanya gua ubah ke port 8082
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log('data', data);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    const fetchCategoriesList = async () => {
      try {
        const response = await fetch(
          'https://dummyjson.com/products/category-list',
        );
        const data = await response.json();
        console.log('data categories', data);
        setListCategory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchCategoriesList();
    fetchProducts();
  }, []);

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {listCategory.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => console.log(`Selected: ${category}`)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 3,
  },
  categoryText: {
    color: 'black',
  },
});

export default Home;
