var img = document.getElementById('NaveRickyMorty');
// Establecer el evento de clic (cuando se mueve el mouse) para lograr efectos dinámicos
document.onmousemove = function (e) {
  // Establece la posición de la imagen igual a la posición del mouse (puedes sumar o restar la distancia apropiadamente)
  img.style.left = e.pageX - 80 + 'px';
  img.style.top = e.pageY - 80 + 'px';
}

$(document).ready(function () {
  $("button").click(function () {
    $("#item-container").toggle();
  });
});

/* 
$(document).ready(function () {
    $(".btn1").click(function () {
        $(document.getElementById('container-portals')).hide();
    });
    $(".btn2").click(function () {
        $(document.getElementById('container-portals')).show();
    });
});
*/

//POO
let personajes = undefined;
let personajesPOO = [];
//Clase personajes
class Personaje {
    //Constructor atributos
    constructor(Nombre, Especie, Imagen) {
        this.nombre = Nombre;
        this.especie = Especie;
        this.imagen = Imagen;
    }
    //Metodos
    //Getter

    //Setter
    set cambiarNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    set cambiarEspecie(nuevaEspecie) {
        this.especie = nuevaEspecie;
    }
    set cambiarImagen(nuevaImagen) {
        this.imagen = nuevaImagen;
    }
}

const requestTarget = document.querySelector('#request-target');
const itemContainer = document.querySelector('#item-container');
const intersectionOptions = {
    threshold: 1
}

let apiUrl = 'https://rickandmortyapi.com/api/character';
let loading = false;

const onIntersect = ([entry]) => {
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}

const makeRequest = () => {
    loading = true;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            personajes = data.results;
            personajes.map((item) => {
                const p1 = new Personaje(item.name,item.species, item.image);
                personajesPOO.push(p1);
            });
            cleanUp(data.info.next);
            renderItems(personajesPOO);
        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
}

const renderItems = results => {
    results.forEach(item => {
        itemContainer.appendChild(show(item));
    });
}

const show = item => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = (
        `
        <div class="card">
        <div class="imagenes-card">
            <img src="./img/image_processing20200616-12657-1o37mef.gif" alt="" class="fondo-card1">
        </div>
        <div class="contenido-card">
        <img class="img-card" src=${item.imagen} />
            <div class="texto-card">
                <h2>${item.nombre}</h2>
                <h3>${item.especie}</h3>
            </div>
        </div>
    </div>
        `
    );
    return newItem;
}

let observer = new IntersectionObserver(onIntersect, intersectionOptions);

observer.observe(requestTarget);