var jsonProductos = []

document.addEventListener('DOMContentLoaded', function(event){

fetch('https://jsonblob.com/api/1297437910830538752')
    .then(response => response.json())
        .then(json =>  {
            jsonProductos = json;
            console.log(jsonProductos);
            cargarNuevaLinea(jsonProductos);
        })


function cargarNuevaLinea(jsonProductos){

    const tabla = document.getElementById('idTabla');

    jsonProductos.products.forEach(products => {

        let cantidad= 0
        const nombreProducto = document.createElement('td');
        nombreProducto.innerHTML = products.title;
    



        const cantidadProducto = document.createElement('td')
        cantidadProducto.innerHTML = 'Añadir'; 
        
        const btnAumentar = document.createElement('button');
        btnAumentar.classList.add('boton')
        btnAumentar.innerHTML = '+';
        btnAumentar.onclick = () => {
            cantidad++;
            cantidadProducto.innerHTML = cantidad;  // Actualiza el label
        };

        const btnDisminuir = document.createElement('button');
        btnAumentar.innerHTML = '-';
        btnAumentar.onclick = () => {
            cantidad++;
            cantidadProducto.innerHTML = cantidad;  // Actualiza el label
        };

        cantidadProducto.appendChild(btnAumentar)
        


        const precioProducto = document.createElement('td')
        precioProducto.innerHTML = products.price + ' ' + jsonProductos.currency;

        const totalProducto = document.createElement('td')
        totalProducto.innerHTML = '0'
    
        const nuevaLinea = document.createElement('tr')
        nuevaLinea.append(nombreProducto,cantidadProducto,precioProducto,totalProducto)

        tabla.appendChild(nuevaLinea);

    })

}


});

