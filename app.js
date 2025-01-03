const themeBtn = document.getElementById('themeBtn');

// Función para cambiar el tema
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('searchBtn').addEventListener('click', searchProducts);

async function searchProducts() {
    const productName = document.getElementById('productName').value;
    if (!productName) {
        alert('Por favor ingrese un nombre de producto.');
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products?search=${productName}`);
        
        // Si la respuesta es exitosa, procesamos los datos
        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            alert('Error al obtener los productos.');
        }
    } catch (error) {
        alert('Hubo un error al buscar los productos.');
    }
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';  // Limpiar la vista previa de productos

    // Verificar si hay productos
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    // Mostrar los productos encontrados
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Estructura del producto
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="100">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
        `;

        productsGrid.appendChild(productDiv);
    });
}

