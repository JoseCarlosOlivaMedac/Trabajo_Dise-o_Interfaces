// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, imagen, precio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
        carrito.push({ nombre, imagen, precio, cantidad: 1 });
    } else {
        carrito.push({ nombre, imagen, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} ha sido añadido al carrito.`);
    mostrarCarrito();
}

// Función para mostrar los productos del carrito en carrito.html
function mostrarCarrito() {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('productosCarrito');

    contenedor.innerHTML = '';

    if (productosCarrito.length > 0) {
        productosCarrito.forEach(producto => {
            const productoHTML = `
                <div class="producto">
                    $1auto; $2300px;">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
            `;
            contenedor.innerHTML += productoHTML;
        });
    } else {
        contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
    alert('El carrito ha sido vaciado.');
}

// Función para finalizar la compra
function finalizarCompra() {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (productosCarrito.length === 0) {
        alert('El carrito está vacío. No hay productos para finalizar la compra.');
        return;
    }

    document.getElementById('formularioCompra').style.display = 'block';
}

// Función para procesar el pago
function procesarPago() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const codigoPostal = document.getElementById('codigoPostal').value;

    if (nombre && telefono && email && direccion && codigoPostal) {
        const idPedido = Math.floor(Math.random() * 1000000);
        alert(`Enhorabuena, el pedido #${idPedido} será enviado a ${direccion}. Llegada prevista: 3 días.`);
        guardarPedido(idPedido, nombre, direccion);
        vaciarCarrito();
        document.getElementById('formularioCompra').style.display = 'none';
        document.getElementById('formCompra').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para guardar el pedido en "Mis pedidos"
function guardarPedido(idPedido, nombre, direccion) {
    const misPedidos = JSON.parse(localStorage.getItem('misPedidos')) || [];
    const nuevoPedido = {
        id: idPedido,
        nombre,
        direccion,
        fecha: new Date().toLocaleDateString(),
        estado: 'Enviado'
    };
    misPedidos.push(nuevoPedido);
    localStorage.setItem('misPedidos', JSON.stringify(misPedidos));
}
