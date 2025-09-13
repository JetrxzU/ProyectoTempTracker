const claveApi = '6c6f1fb43c16475c8aa154946250709';
const idioma = 'es';
const inpCiudad = document.getElementById('input-ciudad');

function cambiarModo(){
    const btnTema = document.querySelector(".tema-btn");
    document.body.classList.toggle("light");
    btnTema.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}

inpCiudad.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        obtenerClima();
    }
});

async function obtenerClima(){
    const ciudad = inpCiudad.value;

    if(!ciudad){
        alert('Por favor ingresa una ciudad');
        return;
    }

    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    const response = await fetch(apiClimaActual);
    const data = await response.json();

    mostrarClima(data);
}

function mostrarClima(data){
    document.querySelector('.clima-icono').src = data.current.condition.icon;
    document.querySelector('.clima-texto').innerHTML = data.current.condition.text;
    document.querySelector('.temp').innerHTML = data.current.temp_c + '°C';
    document.querySelector('.ciudad').innerHTML = data.location.name;
    document.querySelector('.humedad').innerHTML = data.current.humidity + '%';
    document.querySelector('.viento').innerHTML = data.current.wind_kph + 'km/h';


    const contenedor = document.querySelector('.contenedor');
    const condicion = data.current.condition.text.toLowerCase();

    contenedor.classList.remove("lluvia", "nublado", "soleado");

    if (condicion.includes("lluvia")) {
        contenedor.style.background = "linear-gradient(125deg, #3a7bd5, #3a6073)";
        contenedor.classList.add("lluvia");
    } else if (condicion.includes("nublado") || condicion.includes("cloud")) {
        contenedor.style.background = "linear-gradient(125deg, #757f9a, #d7dde8)";
        contenedor.classList.add("nublado");
    } else if (condicion.includes("soleado") || condicion.includes("sunny")) {
        contenedor.style.background = "linear-gradient(125deg, #fbc2eb, #a6c1ee)";
        contenedor.classList.add("soleado");
    } else {
        contenedor.style.background = "linear-gradient(125deg, #00feba, #5b548a)";
    }
}