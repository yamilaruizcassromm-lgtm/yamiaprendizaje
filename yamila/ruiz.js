// Base de Datos de Productos simulada en Javascript
const productos = [
    { id: 1, nombre: "Nike Air Max", categoria: "deportivo", precio: 120.00, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { id: 2, nombre: "Adidas Ultraboost", categoria: "deportivo", precio: 140.00, img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500" },
    { id: 3, nombre: "Mocasines de Cuero", categoria: "formal", precio: 85.00, img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500" },
    { id: 4, nombre: "Sneakers Urbanos", categoria: "urbano", precio: 65.00, img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500" },
    { id: 5, nombre: "Sandalias Casuales", categoria: "casual", precio: 45.00, img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500" },
    { id: 6, nombre: "Zapato de Vestir Elegante", categoria: "formal", precio: 110.00, img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500" }
];

let carrito = [];

// Inicialización del DOM
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderProductos(productos);

    // Eventos para abrir y cerrar el carrito
    document.getElementById("cartBtn").addEventListener("click", toggleCart);
    document.getElementById("closeCartBtn").addEventListener("click", toggleCart);
    document.getElementById("cartOverlay").addEventListener("click", toggleCart);

    // Buscador en tiempo real
    document.getElementById("searchInput").addEventListener("input", (e) => {
        const texto = e.target.value.toLowerCase();
        const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
        renderProductos(filtrados);
    });

    // Filtros por Categoría
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const cat = e.target.getAttribute("data-category");
            if (cat === "todos") {
                renderProductos(productos);
            } else {
                const filtrados = productos.filter(p => p.categoria === cat);
                renderProductos(filtrados);
            }
        });
    });
});

// Función para renderizar los productos en pantalla
function renderProductos(lista) {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    lista.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${prod.nombre}</h3>
                <div class="product-price">$${prod.precio.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="agregarAlCarrito(${prod.id})">
                    <i data-lucide="shopping-cart"></i> Agregar
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

// Lógica del Carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const container = document.getElementById("cartItems");
    const badge = document.getElementById("cartBadge");
    const totalEl = document.getElementById("cartTotalAmount");

    container.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    carrito.forEach(prod => {
        total += prod.precio * prod.cantidad;
        totalItems += prod.cantidad;

        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <div>
                <strong>${prod.nombre}</strong><br>
                <small>$${prod.precio} x ${prod.cantidad}</small>
            </div>
            <div>
                <button onclick="eliminarDelCarrito(${prod.id})" style="color:red; background:none; border:none; cursor:pointer;">Eliminar</button>
            </div>
        `;
        container.appendChild(item);
    });

    badge.innerText = totalItems;
    totalEl.innerText = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
    document.getElementById("cartOverlay").classList.toggle("open");
}