//Almacenar datos en sesionstorage

document.querySelectorAll('.detalle-enlace').forEach((enlace) => {
    enlace.addEventListener('click', (event) => {
        event.preventDefault();
        // Obtener los datos del producto desde los atributos data-*
        const img = enlace.getAttribute('data-img');
        const titulo = enlace.getAttribute('data-titulo');
        const desc = enlace.getAttribute('data-desc');
       
            // Obtener el texto de la descripción larga (contenido del <h4>)
            const descLarga = enlace.closest('div').querySelector('h4').textContent.trim();

        // Almacenar los detalles del producto en sessionStorage
        sessionStorage.setItem('productoDetalles', JSON.stringify({ img, titulo, desc, descLarga }));

        // Redirigir a descripcion.html
        window.location.href = 'descripcion.html';
    });
});

// Recuperar los detalles del producto desde sessionStorage
const productoDetalles = JSON.parse(sessionStorage.getItem('productoDetalles'));

if (productoDetalles) {
    const { img, titulo, desc, descLarga } = productoDetalles;

    // Asignar los valores a los elementos de la página
    document.getElementById('producto-imagen').src = `./img/${img}`;
    document.getElementById('producto-titulo').textContent = titulo || "Título no disponible";
    document.getElementById('producto-descripcion').textContent = desc || "Descripción no disponible";
    document.getElementById('descripcion-larga').textContent = descLarga || "Descripción larga no disponible por ahora";

}else {
    console.error("No se encontraron detalles del producto en sessionStorage.");
}

