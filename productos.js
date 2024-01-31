const productosDiv = document.querySelector('.productos');
let carrito = [];
const listaProductos = [
    { id: 1, nombre: "Auriculares", precio: 10, imagen: "imagenes/descarga (1).jpeg" },
    { id: 2, nombre: "Mouse", precio: 15, imagen: "imagenes/descarga.jpeg" },
    { id: 3, nombre: "Pad", precio: 20, imagen: "imagenes/descarga (2).jpeg" },
    { id: 4, nombre: "Teclado", precio: 25, imagen: "imagenes/images.jpeg" }
];

let modoOscuro = localStorage.getItem('modoOscuro') === 'true';
const toggleModoOscuro = () => {
    modoOscuro = !modoOscuro;
    if (modoOscuro) {
        document.body.classList.add('dark-mode');
        botonModoOscuro.textContent = 'Modo Claro';
    } else {
        document.body.classList.remove('dark-mode');
        botonModoOscuro.textContent = 'Modo Oscuro';
    }
    localStorage.setItem('modoOscuro', modoOscuro);
};
const botonModoOscuro = document.getElementById('modoOscuro');
botonModoOscuro.addEventListener('click', toggleModoOscuro);
if (modoOscuro) {
    document.body.classList.add('dark-mode');
    botonModoOscuro.textContent = 'Modo Claro';
}
const actualizarCantidadCarrito = () => {
    let cantidadTotal = 0;
    carrito.forEach(item => {
        cantidadTotal += item.cantidad;
    });
    const cantidadCarritoSpan = document.getElementById('cantidadCarrito');
    cantidadCarritoSpan.textContent = cantidadTotal;
};

const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCantidadCarrito();
}

listaProductos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.nombre} - Precio: $${producto.precio.toFixed(2)}</p>
        <input type="number" id="cantidad-${producto.id}" min="1" value="0">
        <button class="agregar" data-id="${producto.id}">Agregar al Carrito</button>
    `;
    productosDiv.appendChild(productoDiv);
});
const agregarBotones = document.querySelectorAll('.agregar');
agregarBotones.forEach(boton => {
    boton.addEventListener('click', function () {
        const id = parseInt(this.dataset.id);
        const cantidadInput = document.getElementById(`cantidad-${id}`);
        let cantidad = parseInt(cantidadInput.value);
        if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 0;
        }
        const producto = listaProductos.find(item => item.id === id);
        
        const productoExistenteIndex = carrito.findIndex(item => item.id === id);
        if (productoExistenteIndex !== -1) {
            carrito[productoExistenteIndex].cantidad += cantidad;
        } else {
            carrito.push({...producto, cantidad});
        }
        
        guardarCarrito();
        actualizarCantidadCarrito();
        cantidadInput.value = 0;
    });
});

const irAlCarritoButton = document.getElementById('btnCarrito');
irAlCarritoButton.addEventListener('click', function () {
    window.location.href = 'carrito.html';
});

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}