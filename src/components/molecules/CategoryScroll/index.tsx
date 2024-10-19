import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface Category {
  id: number;
  name: string;
}

interface CategoryScrollProps {
  categories: Category[]; // Expecting an array of Category objects
  selectedCategory: string | null;
  onSelectCategory: (category: Category) => void; // Expect the entire Category object
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScroll}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id} // Use category.id as the key
          style={[
            styles.categoryButton,
            selectedCategory === category.name && styles.selectedCategoryButton,
          ]}
          onPress={() => onSelectCategory(category)} // Pass the full Category object
          accessibilityRole="button"
          accessibilityState={{ selected: selectedCategory === category.name }}
          accessibilityLabel={`Category ${category.name}`}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category.name && styles.selectedCategoryText
          ]}>
            {category.name.replace(/-/g, ' ').replace(/\b\w/g, str => str.toUpperCase())} {/* Display the category name with first word capitalized and hyphens removed */}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#f9f4ef',
    elevation: 3,
  },
  selectedCategoryButton: {
    backgroundColor: '#8c7851',
  },
  categoryText: {
    color: 'black',
  },
  selectedCategoryText: {
    color: '#f9f9f9',
  },
});

export default CategoryScroll;
