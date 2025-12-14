const BASE_URL = 'https://fakestoreapi.com';

export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}
