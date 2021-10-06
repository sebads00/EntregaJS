//Crear productos
function crearProducto() {
    productos.forEach(producto => {
        $('#grid').append(
            `<div class="card " style="width: 100%;">
            <div class="img__contenedor">
            <img src="${producto.imagen}" class="card-img-top img" alt="...">
            </div>
            <div class="card-body card__posicion">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio}</p>
                <div class = "card__datos">
                    <input type="number" id="cantidad${producto.id}">
                    <button class="card__boton" id="boton${producto.id}">Agregar al carrito</button>
                </div>          
                </div>
            </div>`
        )
        let cantidad = document.getElementById("cantidad" + producto.id)

        $('#boton' + producto.id).on("click", agregarItem)
//Funcio parta agregar al carrito y guardar en el LS
        function agregarItem() {
            if(cantidad.value > 0){
            let resultado = `${cantidad.value} :  ${producto.nombre}  $${producto.precio * cantidad.value}`
            localStorage.setItem('total', JSON.stringify(resultado))
            $("#carrito").append(`<p>${resultado}</p>`)}
        }
    })
};
crearProducto();

//Crear productos filtrados
let categoria = document.querySelectorAll('input[type="radio"]')
categoria.forEach(check => check.addEventListener("change", filtrar));

function productoFiltrado(productos) {
    productos.forEach(producto => {
        $('#grid').append(
            `<div class="card" style="width: 100%;">
            <div class="img__contenedor">
            <img src="${producto.imagen}" class="card-img-top img" alt="...">
            </div>
            <div class="card-body card__posicion">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio}</p>
                <div class = "card__datos">
                    <input type="number" id="cantidad${producto.id}">
                    <button class="card__boton" id="boton${producto.id}">Agregar al carrito</button>
                </div>          
                </div>
            </div>`
        )

        let cantidad = document.getElementById("cantidad" + producto.id)
        $('#boton' + producto.id).on("click", agregarItem)

        function agregarItem() {
            let resultado = `${cantidad.value} :  ${producto.nombre}  $${producto.precio * cantidad.value}`
            localStorage.setItem('total', JSON.stringify(resultado))
            $("#carrito").append(`<p>${resultado}</p>`)
        }
    })

};
//Mostrar y esconder carrito y filtros
$('#btn__filtro').on('click', mostrarFiltro)

function mostrarFiltro() {
    $("#filtros").toggle("slow")
}

$('#btn__carrito').on('click', mostrar)

function mostrar() {
    $("#carrito").toggle("slow")
}
//Filtrar productos
function filtrar() {

    grid.innerHTML = "";

    const checkeado = Array.from(categoria).filter(elemento => elemento.checked);
    const valorCheckeado = checkeado.map(elemento => elemento.value)

    let filtrado = [];


    if (valorCheckeado == "mostrarTodo") {

        filtrado = productos

    } else if (valorCheckeado == "crema") {

        filtrado = productos.filter(producto => producto.tipo == "crema");


    } else if (valorCheckeado == "esmalte") {

        filtrado = productos.filter(producto => producto.tipo == "esmalte")

    } else if (valorCheckeado == "perfume") {

        filtrado = productos.filter(producto => producto.tipo == "perfume")
    }

    productoFiltrado(filtrado);
}