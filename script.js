var jsonProductos = [];

class Carrito {
    constructor() {
        this.productos = [];
    }

    actualizaCarrito(producto, cantidad) {
        const index = this.productos.findIndex(p => p.SKU === producto.SKU);
        if (cantidad > 0) {
            if (index !== -1) {
                this.productos[index].cantidad = cantidad; 
            } else {
                this.productos.push({ ...producto, cantidad }); 
            }
        } else if (index !== -1) {
            this.productos.splice(index, 1); 
        }
        console.log(this.productos);
    }

    obtenerInformacionProducto(sku) {
        const producto = this.productos.find(p => p.SKU === sku);
        return producto ? { SKU: producto.SKU, quantity: producto.cantidad } : null;
    }

    obtenerCarrito() {
        const total = this.productos.reduce((acc, p) => acc + (p.price * p.cantidad), 0);
        return {
            total: total.toFixed(2),
            currency: "€",
            products: this.productos.map(p => ({
                sku: p.SKU,
                quantity: p.cantidad
            }))
        };
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    fetch('https://jsonblob.com/api/1297437910830538752')
        .then(response => response.json())
        .then(json => {
            jsonProductos = json;
            cargarNuevaLinea(jsonProductos);
        });

    const carrito = new Carrito(); 

    function cargarNuevaLinea(jsonProductos) {
        const tablaProductos = document.getElementById('idTablaProductos');

        jsonProductos.products.forEach(product => {
            let cantidad = 0;

            // NOMBRE
            const nombreProducto = document.createElement('td');
            nombreProducto.innerHTML = product.title;

            // CANTIDAD
            const cantidadProducto = document.createElement('input');
            cantidadProducto.value = cantidad; 
            cantidadProducto.classList.add('inputCantidadProducto');
            cantidadProducto.onchange = () => {
                if (!isNaN(cantidadProducto.value)){
                    cantidad = cantidadProducto.value;
                    actualizaTotal();
                    carrito.actualizaCarrito(product, cantidad);
                    cargarCarrito(); // Actualizar el carrito visualmente
                } else {
                    alert('Ingrese un número válido');
                    cantidadProducto.value = 0;
                }
            };

            const btnAumentar = document.createElement('button');
            btnAumentar.classList.add('boton');
            btnAumentar.innerHTML = '+';

            const btnDisminuir = document.createElement('button');
            btnDisminuir.classList.add('boton');
            btnDisminuir.innerHTML = '-';

            btnAumentar.onclick = () => {
                cantidad++;
                cantidadProducto.value = cantidad;
                actualizaTotal();
                carrito.actualizaCarrito(product, cantidad);
                cargarCarrito(); // Actualizar el carrito visualmente
            };

            btnDisminuir.onclick = () => {
                if (cantidad > 0) { 
                    cantidad--;
                    cantidadProducto.value = cantidad;
                    actualizaTotal();
                    carrito.actualizaCarrito(product, cantidad);
                    cargarCarrito(); // Actualizar el carrito visualmente
                }
            };

            const contenedorCantidad = document.createElement('div');
            contenedorCantidad.classList.add('contenedorCantidad');
            contenedorCantidad.appendChild(btnDisminuir);
            contenedorCantidad.appendChild(cantidadProducto);
            contenedorCantidad.appendChild(btnAumentar);

            // PRECIO
            const precioProducto = document.createElement('td');
            precioProducto.innerHTML = product.price + ' ' + jsonProductos.currency;

            // TOTAL
            const totalProducto = document.createElement('td');

            // Agregar nueva línea
            const nuevaLinea = document.createElement('tr');
            nuevaLinea.append(nombreProducto, contenedorCantidad, precioProducto, totalProducto);
            tablaProductos.appendChild(nuevaLinea);

            // Actualizar total por producto
            function actualizaTotal() {
                totalProducto.innerHTML = (cantidad * parseFloat(product.price)).toFixed(2) + ' ' + jsonProductos.currency;
                actualizarTotalGeneral();
            }

            // Inicializar total por producto
            actualizaTotal();
        });
    }

  
    function calcularTotalGeneral() {
        let total = 0;
        carrito.productos.forEach(producto => {
            total += parseFloat(producto.price) * producto.cantidad;
        });
        return total;
    }
    


    function actualizarTotalGeneral() {
        const totalGeneral = calcularTotalGeneral();
        const tablaTotal = document.getElementById('idTablaTotal');
        tablaTotal.innerHTML = `<tr><td colspan="2" id="Total">Total: ${totalGeneral.toFixed(2)} ${jsonProductos.currency}</td></tr>`;
    }

    // Carga el carrito en el div de los totles
    function cargarCarrito() {
        const tablaTotal = document.getElementById('idTablaTotal');
        tablaTotal.innerHTML = ''; 

        carrito.productos.forEach(producto => {
            const nombreTotal = document.createElement('td');
            nombreTotal.innerHTML = producto.cantidad + ' X ' + producto.title;

            const cantidadTotal = document.createElement('td');
            cantidadTotal.innerHTML = (producto.cantidad * parseFloat(producto.price)).toFixed(2) + ' ' + jsonProductos.currency;

            const nuevaLineaTotal = document.createElement('tr');
            nuevaLineaTotal.append(nombreTotal, cantidadTotal);

            tablaTotal.appendChild(nuevaLineaTotal);
        });

        // Actualiza el total totall
        const totalGeneral = calcularTotalGeneral();
        const totalFila = document.createElement('tr');
        totalFila.innerHTML = `<td colspan="2" id="Total">Total: ${totalGeneral.toFixed(2)} ${jsonProductos.currency}</td>`;
        tablaTotal.appendChild(totalFila);
    }
});
