
// Variables del programa
let numeroB = 0;
let numeroC = 0;
let grafico = null;


// Crear la ventana de GeoGebra
const aplicacion = new GGBApplet({

    appName: "graphing",
    width: 800,
    height: 450,
    showToolBar: false,
    showMenuBar: false,

    appletOnLoad: function(objeto) {
        grafico = objeto;
    }

}, true);


// Insertar GeoGebra en la página
window.addEventListener("load", function() {
    aplicacion.inject("ggb-element");
});


// Función para ocultar las tarjetas
function ocultarResultados() {

    const tarjetas = document.querySelectorAll(".caja");

    tarjetas.forEach(function(elemento) {
        elemento.style.display = "none";
    });

}


// Generar valores aleatorios
function generarValores() {

    numeroB = Math.floor(Math.random() * 7) - 3;
    numeroC = Math.floor(Math.random() * 7) - 3;

    document.getElementById("valorB").textContent = "b = " + numeroB;
    document.getElementById("valorC").textContent = "c = " + numeroC;

    ocultarResultados();
    clasificarFuncion();

    dibujarGrafico();

}


// Crear el texto de la fórmula
function crearFormula() {

    let expresion = "f(x) = " + numeroB + "x";

    if (numeroC > 0) {
        expresion += " + " + numeroC;
    } else if (numeroC < 0) {
        expresion += " - " + Math.abs(numeroC);
    }

    return expresion;

}


// Clasificar el tipo de función
function clasificarFuncion() {

    let texto = "Fórmula: " + crearFormula();

    // Caso en que los dos valores son cero
    if (numeroB === 0 && numeroC === 0) {

        mostrarResultado("noHay", "resultadoNoHay",
            "No hay función.");

    }

    // Función constante
    else if (numeroB === 0) {

        texto += "\nEs una línea horizontal.";
        texto += "\nCorta el eje Y en (0, " + numeroC + ").";
        texto += "\nEs constante.";

        mostrarResultado("constante", "resultadoConstante", texto);

    }

    // Función lineal
    else if (numeroC === 0) {

        texto += "\nPasa por el origen (0, 0).";

        if (numeroB > 0) {
            texto += "\nEs creciente.";
        } else {
            texto += "\nEs decreciente.";
        }

        mostrarResultado("lineal", "resultadoLineal", texto);

    }

    // Función afín
    else {

        texto += "\nNo pasa por el origen.";
        texto += "\nCorta el eje Y en (0, " + numeroC + ").";

        if (numeroB > 0) {
            texto += "\nEs creciente.";
        } else {
            texto += "\nEs decreciente.";
        }

        mostrarResultado("afin", "resultadoAfin", texto);

    }

}


// Mostrar el resultado correspondiente
function mostrarResultado(caja, parrafo, contenido) {

    document.getElementById(caja).style.display = "block";

    document.getElementById(parrafo).textContent = contenido;

}


// Actualizar la gráfica
function dibujarGrafico() {

    if (grafico !== null) {

        grafico.evalCommand(
            "f(x) = " + numeroB + "*x + " + numeroC
        );

    }

}


// Activar el botón
document.getElementById("generar").addEventListener(
    "click",
    generarValores
);
