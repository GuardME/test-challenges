import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {CategoryScroll, EventCard} from '../../components/molecules';
import {Gap, Header} from '../../components/atoms';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of categories
    const fetchCategoriesList = async () => {
      setCategoriesLoading(true);
      try {
        const response = await fetch(
          'https://dummyjson.com/products/category-list',
        );
        const data = await response.json();
        setListCategory(data);
        if (data.length > 0) {
          const firstCategory = data[0];
          setSelectedCategory(firstCategory);
          fetchProductsByCategory(firstCategory);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategoriesList();
  }, []);

  const fetchProductsByCategory = async (category: String) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`,
      );
      const data = await response.json();
      console.log(
        'Products fetched for category',
        category,
        ':',
        data.products,
      );
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  

  
  const handleCategorySelect = (category: String) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Horizontal Scroll for Categories */}
      <Header
        title={
          selectedCategory
            ? `${
                (selectedCategory as string).charAt(0).toUpperCase() +
                (selectedCategory as string).slice(1)
              } Page`
            : ''
        }
        subtitle="Expolore Out Product"
      />
      <Gap height={25} />
      {categoriesLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <CategoryScroll
          categories={listCategory}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

 
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <View key={index} style={styles.productCard}>
       

            <Image
              source={{uri: product.thumbnail}}
              style={styles.productImage}
              resizeMode="cover"
            />

            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        ))
      ) : selectedCategory ? (
        <Text>No products available for the selected category.</Text>
      ) : (
        <Text>Please select a category to view products.</Text>
      )}
      {/* {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))} */}
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
    backgroundColor: '#add8e6', // Highlight selected category
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
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Home;
