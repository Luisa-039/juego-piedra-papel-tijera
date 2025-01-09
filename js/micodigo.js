const contenedorJuego = document.querySelector(".container"),
    resultadoUsuario = document.querySelector(".user_resultados img"),
    pcResultado = document.querySelector(".pc_resultados img"),
    resultados = document.querySelector(".resultados"),
    opcionImagenes = document.querySelectorAll(".opcion_imagen"),
    selectorDificultad = document.getElementById("dificultad");

// Función para determinar la elección del PC según la dificultad
function obtenerOpcionCpu(dificultad, opcionJugador) {
    const opciones = ["piedra", "papel", "tijera"];
    if (dificultad === "facil") {
        return opciones[Math.floor(Math.random() * 3)];
    }
    if (dificultad === "medio") {
        const probabilidad = [...opciones, opcionJugador];
        return probabilidad[Math.floor(Math.random() * 4)];
    }
    const contador = { piedra: "papel", papel: "tijera", tijera: "piedra" };
    return Math.random() < 0.7 ? contador[opcionJugador] : opciones[Math.floor(Math.random() * 3)];
};

// Lógica principal del juego
opcionImagenes.forEach((imagen, index) => {
    imagen.addEventListener("click", (e) => {
        // Activar la opción seleccionada
        imagen.classList.add("active");

        // Reiniciar las imágenes y resultados
        resultadoUsuario.src = pcResultado.src = "img/piedra.png";
        resultados.textContent = "Espera...";

        // Desactivar otras opciones
        opcionImagenes.forEach((image2, index2) => {
            if (index !== index2) {
                image2.classList.remove("active");
            }
        });

        // Agregar clase de animación
        contenedorJuego.classList.add("inicio");

        // Simulación de espera antes de mostrar el resultado
        let tiempo = setTimeout(() => {
            contenedorJuego.classList.remove("inicio");

            // Obtener la imagen seleccionada por el usuario
            let imagenSrc = imagen.querySelector("img").src;
            resultadoUsuario.src = imagenSrc;

            // Obtener la elección del jugador y la dificultad seleccionada
            let opcionJugador = ["piedra", "papel", "tijera"][index];
            let dificultad = selectorDificultad.value;

            // Generar la elección del PC basada en la dificultad
            let opcionCpu = obtenerOpcionCpu(dificultad, opcionJugador);
            pcResultado.src = `img/${opcionCpu}.png`;

            // Asignar valores a las elecciones
            let pcValue = { piedra: "R", papel: "P", tijera: "T" }[opcionCpu];
            let userValue = ["R", "P", "T"][index];

            // Definir los resultados posibles
            let marcadores = {
                RR: "Empate",
                RP: "Pc",
                RT: "Usuario",
                PP: "Empate",
                PR: "Usuario",
                PT: "Pc",
                TT: "Empate",
                TR: "Pc",
                TP: "Usuario",
            };

            // Determinar el resultado
            let marcadorValue = marcadores[userValue + pcValue];
            resultados.textContent =
                userValue === pcValue ? "Empate" : `${marcadorValue} Gana!!`;

            // Limpiar el timeout
            clearTimeout(tiempo);
        }, 2500); // Tiempo de espera para mostrar el resultado
    });
});
