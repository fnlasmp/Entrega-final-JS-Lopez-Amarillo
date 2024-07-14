
const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const shopContainer = document.getElementById('shop-container');
const cantidadCarrito = document.getElementById('cantidadCarrito');

//array carrito
// usamos || en caso de que el carrito este vacio o sin dato en el local storage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const showToast = (message, type) => {
    Toastify({
        text: message,
        duration: 3000, 
        close: true,
        gravity: 'top',
        backgroundColor: type === 'error' ? '#ff6347' : '#4caf50',
    }).showToast();
};

//Asincronia y promesas
const getProducts = async () => {
    const response = await fetch('data.json');
    const data = await response.json();

    data.forEach((donas) => {
        let content = document.createElement("div");
        content.className = 'card'
        content.innerHTML = `
            <img src="${donas.img}">
            <h3>${donas.nombre}</h3>
            <p class='price'>${donas.precio}$</p>
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement('button')
        comprar.innerText = 'seleccionar';
        comprar.className = 'seleccionar'
    
        content.append(comprar);
    
        comprar.addEventListener('click',() =>{
    
        
            //Acumulacion en carrito, para no repetir productos
        const repeat = carrito.some((itemDona) => itemDona.id === donas.id);
        //El log es para chequear en la consola que funciona bien
        console.log(repeat);
    
        if(repeat){
            carrito.map((itemDona) => {
                if(itemDona.id === donas.id){
                    itemDona.cantidad++
                };
                
            });
        }else {
            carrito.push({
                id: donas.id,
                nombre: donas.nombre,
                precio: donas.precio,
                img: donas.img,
                cantidad: donas.cantidad, 
                
            });
        }
            console.log(carrito);
            carritoCounter();
            saveLocal();
            // Mostrar notificación Toast
            showToast(`${donas.nombre} añadido al carrito`, 'success')
        });
    });
    
}

getProducts();

//set item - guardamos en localstore
const saveLocal = () => {
localStorage.setItem('carrito',JSON.stringify(carrito))
}

//get item - obtenemos lo guardado
JSON.parse(localStorage.getItem('carrito'));