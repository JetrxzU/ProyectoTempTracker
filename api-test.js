const claveApi = '6c6f1fb43c16475c8aa154946250709';
const idioma = 'es';
const ciudad = 'Huancayo';

const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

const response = await fetch(apiClimaActual);
let data = await response.json();

console.log(data);
console.log(data.location.localtime);
console.log(data.current.condition);