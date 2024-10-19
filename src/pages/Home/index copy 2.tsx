import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import {EventCard} from '../../components/molecules';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesList = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        const data = await response.json();
        console.log('data categories', data);
        setListCategory(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategoriesList();
  }, []);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await response.json();
      console.log('data products', data.products);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {listCategory.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Display Products */}
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        products.length > 0 ? (
          products.map((product, index) => (
            <View key={index} style={styles.productCard}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          ))
        ) : (
          <Text>No products available for the selected category.</Text>
        )
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  categoryScroll: {
    marginBottom: 16,
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
  selectedCategoryButton: {
    backgroundColor: '#add8e6',
  },
  categoryText: {
    color: 'black',
  },
  productCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Home;
