import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {CategoryScroll} from '../../components/molecules';
import {Gap, Header} from '../../components/atoms';
import {Product, Category} from '../../utils';
import {
  fetchCategories,
  fetchProductsByCategory,
} from '../../services/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setSelectedCategory(fetchedCategories[0]);
        loadProducts(fetchedCategories[0]);
      }
    } catch (err) {
      setError('Failed to load categories.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadProducts = useCallback(async (category: Category) => {
    try {
      setIsLoading(true);
      const fetchedProducts = await fetchProductsByCategory(category);
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategorySelect = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      loadProducts(category);
    },
    [loadProducts],
  );

  const renderProductItem = useCallback(
    ({item}: {item: Product}) => (
      <TouchableOpacity onPress={() => showProductDetails(item)}>
        <View style={styles.productCard}>
          <Image
            source={{uri: item.thumbnail}}
            style={styles.productImage}
            resizeMode="cover"
          />
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <Text
              style={styles.productToFav}
              onPress={() => addToFavorites(item)}>
              Add To Favorites
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const addToFavorites = async (item: Product) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('@favorites');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      const newFavorites = [...favorites, item];

      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
      Alert.alert('Success', `${item.title} success added to favorites!`);
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <View>
            <View style={styles.stickyHeader}>
              <Header
                title={
                  selectedCategory
                    ? `${selectedCategory.name
                        .replace(/-/g, ' ')
                        .replace(/\w\S*/g, function (txt) {
                          return (
                            txt.charAt(0).toUpperCase() +
                            txt.slice(1).toLowerCase()
                          );
                        })} Products`
                    : 'Products'
                }
                subtitle="Explore our collection"
              />
              <Gap height={15} />

              <CategoryScroll
                categories={categories}
                selectedCategory={selectedCategory?.name || null}
                onSelectCategory={handleCategorySelect}
              />
            </View>

            <Gap height={15} />
          </View>
        }
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.emptyText}>
              No products available for the selected category.
            </Text>
          ) : null
        }
        ListFooterComponent={
          isLoading && <ActivityIndicator size="large" color="green" />
        }
        contentContainerStyle={styles.productList}
      />
      <Gap height={55} />

      {selectedProduct && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{uri: selectedProduct.thumbnail}}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>

              <View style={styles.tagContainer}>
                {selectedProduct.tags.map((tag, index) => (
                  <Text key={index} style={styles.modalTags}>
                    {tag}
                  </Text>
                ))}
              </View>
              <Text style={styles.modalPrice}>
                ${selectedProduct.price.toFixed(2)}
              </Text>

              <Text style={styles.modalLabel}>
                Brand: {selectedProduct.brand}
              </Text>
              <Text style={styles.modalLabel}>
                Rating: {selectedProduct.rating} / 5
              </Text>
              <Text style={styles.modalLabel}>
                Stock: {selectedProduct.stock} available
              </Text>

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={{color: 'red'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productList: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
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
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#8c7851',
    fontWeight: 'bold',
  },
  productToFav: {
    color: '#8c7851',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    color: '#8c7851',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  modalTags: {
    backgroundColor: '#8c7851',
    color: 'white',
    padding: 5,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    fontSize: 18,
  },
});

export default Home;
