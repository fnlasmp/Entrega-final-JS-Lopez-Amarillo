const pintarCarrito = () => {
    shopContainer.innerHTML = '';
    shopContainer.style.display = 'flex';


    const shopHeader = document.createElement('div');
    shopHeader.className = 'shop-window';
    shopHeader.innerHTML = `
        <h2 class='shop-window-header'>Carrito</h2>
    `;
    shopContainer.append(shopHeader);


    const shopButton = document.createElement('h2');
    shopButton.innerText = 'Cerrar';
    shopButton.className = 'shop-header-button';
    shopButton.addEventListener('click', () => {
        shopContainer.style.display = 'none';
    });
    shopHeader.append(shopButton);


    carrito.forEach((donas) => {
        let carritoContent = document.createElement('div');
        carritoContent.className = 'shop-content';
        carritoContent.innerHTML = `
            <img src="${donas.img}">
            <h3>${donas.nombre}</h3>
            <p class='price'>${donas.precio}$</p>
            <span class='restar'> ➖ </span>
            <p>Cantidad: ${donas.cantidad}</p>
            <span class='sumar'> ➕ </span>
            <p>Total: $ ${donas.cantidad * donas.precio}</p>
            <span class='delete-product'>❌</span>
        `;

        //Capturo sumar y restar para darle la funcion

        let restar = carritoContent.querySelector('.restar');

        restar.addEventListener('click', () => {
            if(donas.cantidad !== 1) {
            donas.cantidad--;
        }
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector('.sumar')
        sumar.addEventListener('click', () => {
            donas.cantidad++;
            pintarCarrito();
        })

        // Botón para borrar items del carrito
        let eliminar = carritoContent.querySelector('.delete-product');
        eliminar.addEventListener('click', () => {
            eliminarProducto(donas.id);
        });

        shopContainer.append(carritoContent);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement('div');
    totalCompra.className = 'total-compra';
    totalCompra.innerHTML = `Total a pagar: ${total}$`;
    shopContainer.append(totalCompra);
};

// Función para eliminar un producto del carrito
const eliminarProducto = (id) => {
    const foundIndex = carrito.findIndex((element) => element.id === id);
    if (foundIndex !== -1) {
        carrito.splice(foundIndex, 1);
    }

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

verCarrito.addEventListener('click', pintarCarrito);

const carritoCounter = () => {
    cantidadCarrito.style.display = 'block';
    const carritoLength = carrito.length;
    localStorage.setItem('carritoLength', JSON.stringify(carritoLength));
    cantidadCarrito.innerText = carritoLength;
};

carritoCounter();
