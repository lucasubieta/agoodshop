var jsonProductos = [];

document.addEventListener('DOMContentLoaded', function(event) {

    fetch('https://jsonblob.com/api/1297437910830538752')
        .then(response => response.json())
        .then(json => {
            jsonProductos = json;
            console.log(jsonProductos);
            cargarNuevaLinea(jsonProductos);
        });

        
    function cargarNuevaLinea(jsonProductos) {
        const tabla = document.getElementById('idTabla');

        jsonProductos.products.forEach(product => {
            let cantidad = 0;

            // Crear elementos de la fila
            const nombreProducto = document.createElement('td');
            nombreProducto.innerHTML = product.title;

            const cantidadProducto = document.createElement('input')
            cantidadProducto.value = cantidad; 
            cantidadProducto.classList.add('inputCantidadProducto')

            cantidadProducto.onchange = () => {
                if (!isNaN(cantidadProducto.value)){
                cantidad = cantidadProducto.value;
                actualizaTotal();
            }else{
                    alert('Ingrese un número válido')
                    cantidadProducto.value = 0;
                }
            };


            const btnAumentar = document.createElement('button');
            btnAumentar.classList.add('boton');
            btnAumentar.innerHTML = '+';

            const btnDisminuir = document.createElement('button');
            btnDisminuir.classList.add('boton');
            btnDisminuir.innerHTML = '-';

            // Añadir eventos a los botones
            btnAumentar.onclick = () => {
                cantidad++;
                cantidadProducto.value = cantidad;
                actualizaTotal();

            };

            btnDisminuir.onclick = () => {
                if (cantidad > 0) { // Evitar que la cantidad sea negativa
                    cantidad--;
                    cantidadProducto.value = cantidad;
                    actualizaTotal();
                }
            };

            // Añadir botones al campo de cantidad
            const contenedorCantidad = document.createElement('div');
            contenedorCantidad.classList.add('contenedorCantidad')
            contenedorCantidad.appendChild(btnDisminuir);
            contenedorCantidad.appendChild(cantidadProducto);
            contenedorCantidad.appendChild(btnAumentar);

       
            const precioProducto = document.createElement('td');
            precioProducto.innerHTML = product.price + ' ' + jsonProductos.currency;

            const totalProducto = document.createElement('td');


            // Agrego los elementos al dom
            const nuevaLinea = document.createElement('tr');
            nuevaLinea.append(nombreProducto, contenedorCantidad, precioProducto, totalProducto);

            tabla.appendChild(nuevaLinea);

            //Función para no repetir la actualización
            function actualizaTotal(){
                totalProducto.innerHTML = (cantidad * parseFloat(product.price)).toFixed(2);
            }

        });
    }

  


});
