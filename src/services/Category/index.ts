import {API_URL} from '../../config';
import {Product, Category} from '../../utils';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL.url}/products/category-list`);
    const data: string[] = await response.json();

    return data.map((categoryName: string, index: number) => ({
      id: index + 1,
      name: categoryName,
    }));
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchProductsByCategory = async (
  category: Category,
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_URL.url}/products/category/${category.name}`,
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
