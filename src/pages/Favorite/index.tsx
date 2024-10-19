import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../../utils';
import {Header} from '../../components/atoms';

const Favorite = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem('@favorites');
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
        } catch (error) {
          console.error('Failed to load favorites:', error);
        }
      };

      loadFavorites();
    }, []),
  );

  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const removeFromFavorites = async (id: number) => {
    try {
      const updatedFavorites = favorites.filter(item => item.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        '@favorites',
        JSON.stringify(updatedFavorites),
      );
      Alert.alert('Success', `success remove from your favorites!`);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Favorites" subtitle="Your saved products" />
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => showProductDetails(item)}>
            <View style={styles.productCard}>
              <Image
                source={{uri: item.thumbnail}}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>
                  {item.description}
                </Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                  <Text
                    style={styles.productToFav}
                    onPress={() => removeFromFavorites(item.id)}>
                    Remove From Favorites
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.footer}>No favorites added yet.</Text>
        }
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#8c7851',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  productCard: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    marginRight: 10,
    marginLeft: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetails: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
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
    color: '#f25042',
  },
  footer: {
    textAlign: 'center',
    marginTop: 10,
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
    fontSize: 18
  },
});

export default Favorite;
