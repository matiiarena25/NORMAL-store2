

const BASE_URL = "https://69282d3fb35b4ffc50148800.mockapi.io";

export const createProduct = async (product) => {
    const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Error al crear el producto');
    }

    const result = await response.json();

    return result;
};

export const getProducts = async (category) => {
    let url = `${BASE_URL}/products`;
    if (category) {
        url = `${BASE_URL}/products?category=${category}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }
    return response.json();
}

export const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el producto');
    }
    return response.json();
}

export const getProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener el producto');
    }
    return response.json();
}


