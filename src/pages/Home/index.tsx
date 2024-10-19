import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {CategoryScroll} from '../../components/molecules';
import {Gap, Header} from '../../components/atoms';
import {Product, Category} from '../../utils';
import {
  fetchCategories,
  fetchProductsByCategory,
} from '../../services/Category';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      <View style={styles.productCard}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.productImage}
          resizeMode="cover"
        />
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

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
  productPrice: {
    fontSize: 16,
    color: '#8c7851',
    fontWeight: 'bold',
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
});

export default Home;
