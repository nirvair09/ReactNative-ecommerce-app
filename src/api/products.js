const BASE_URL = 'https://fakestoreapi.com';

export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    return response.json();
}

export async function fetchProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("Failed to load Product");
    }

    return response.json();
}