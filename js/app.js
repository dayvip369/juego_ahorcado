const PALABRA = document.getElementById("palabra");
const TECLADO = document.getElementById("teclado");
const ERROR = document.getElementById("error");
const RESULTADO = document.getElementById("resultado");

const partesCuerpo = [
  "#pierna-izq", "#pierna-der", "#tronco",
  "#brazo-izq", "#brazo-der", "#cabeza"
];

let palabraRandom = "";
let palabraAdivinada = [];
let intentos = 6;
let error = 0;

function pintarErrores() {

  if (error > 0) {
    const parte = document.querySelector(partesCuerpo[error - 1]);

    if (parte) {
      parte.classList.remove("hidden");
    }
  }

  ERROR.innerHTML = `${error}/${intentos}`;
}

function pintarPalabra() {
  PALABRA.innerHTML = palabraAdivinada.join(" ");
}

function empezar() {

  // Ocultar pantalla de resultado
  RESULTADO.classList.add("hidden");
  RESULTADO.classList.remove("flex");

  RESULTADO.innerHTML = "";

  palabraRandom =
    PALABRAS[Math.floor(Math.random() * PALABRAS.length)].toUpperCase();

  palabraAdivinada = Array(palabraRandom.length).fill("_");

  document.querySelectorAll(".parte-cuerpo").forEach(parte => {
    parte.classList.add("hidden");
  });

  error = 0;

  pintarErrores();
  pintarPalabra();
  teclado();
}

function teclado() {
  TECLADO.innerHTML = "";

  const abc = "QWERTYUIOPASDFGHJKLÑZXCVBNM";

  for (const letra of abc) {
    const button = document.createElement("button");

    button.id = letra;
    button.innerHTML = letra;

    button.className = `
      w-9 h-9 sm:w-12 sm:h-12
      rounded-xl
      bg-blue-400 text-white
      font-black text-sm sm:text-lg
      border-b-4 border-blue-600
      shadow-md transition-all duration-150
      hover:bg-blue-300 hover:scale-110
      hover:-translate-y-1 hover:shadow-lg
      active:scale-95 active:translate-y-1
      active:border-b-0
    `;

    button.addEventListener("click", () => pulsar(letra));
    TECLADO.appendChild(button);
  }
}

function pulsar(valor) {
  const boton = document.getElementById(valor);

  boton.disabled = true;

  boton.classList.remove(
    "bg-blue-400",
    "hover:bg-blue-300",
    "hover:scale-110",
    "hover:-translate-y-1",
    "hover:shadow-lg"
  );

  boton.classList.add(
    "bg-gray-300",
    "text-gray-500",
    "border-gray-400",
    "cursor-not-allowed",
    "opacity-60"
  );

  if (palabraRandom.includes(valor)) {

    for (let i = 0; i < palabraRandom.length; i++) {
      if (palabraRandom[i] === valor) {
        palabraAdivinada[i] = valor;
      }
    }

    pintarPalabra();

    if (palabraAdivinada.join("") === palabraRandom) {
      terminarJuego("ganado");
    }

  } else {

    error++;
    pintarErrores();

    if (error >= intentos) {
      terminarJuego("perdido");
    }
  }
}

function terminarJuego(resultado) {

  document.querySelectorAll("#teclado button").forEach(boton => {
    boton.disabled = true;

    boton.classList.remove(
      "hover:bg-blue-300",
      "hover:scale-110",
      "hover:-translate-y-1",
      "hover:shadow-lg"
    );

    boton.classList.add(
      "bg-gray-300",
      "text-gray-500",
      "border-gray-400",
      "cursor-not-allowed",
      "opacity-60"
    );
  });

  // Crear la ventana completa
  RESULTADO.innerHTML = `
    <div class="
      flex flex-col items-center
      bg-white
      rounded-3xl
      shadow-2xl
      p-6
      text-center
      border-4
      ${resultado === "ganado" ? "border-yellow-300" : "border-red-300"}
    ">

      ${
        resultado === "ganado"
          ? `
            <div class="text-4xl sm:text-5xl">
              🥳 🏆 ⭐
            </div>

            <h2 class="
              mt-2
              text-2xl sm:text-3xl
              font-black
              text-green-600
            ">
              ¡MUY BIEN!
            </h2>

            <p class="
              mt-1
              text-sm sm:text-lg
              font-bold
              text-purple-600
            ">
              ¡Has adivinado la palabra! 🎉
            </p>
          `
          : `
            <div class="text-4xl">
              😅 💪
            </div>

            <h2 class="
              mt-2
              text-2xl sm:text-3xl
              font-black
              text-red-500
            ">
              ¡Casi lo consigues!
            </h2>

            <p class="
              mt-1
              text-sm sm:text-base
              font-bold
              text-gray-600
            ">
              La palabra era:
              <span class="text-purple-600">
                ${palabraRandom}
              </span>
            </p>
          `
      }

      <button
        id="boton-reiniciar"
        class="
          mt-5
          bg-green-500
          text-white
          font-black
          px-6 py-3
          rounded-2xl
          border-b-4 border-green-700
          shadow-lg
          transition-all duration-200
          hover:bg-green-400
          hover:scale-105
          hover:-translate-y-1
          active:scale-95
          active:translate-y-1
          active:border-b-0
        "
      >
        🔄 ¡Jugar otra vez!
      </button>

    </div>
  `;

  // Botón de nueva partida
  document
    .getElementById("boton-reiniciar")
    .addEventListener("click", empezar);

  // Mostrar resultado
  RESULTADO.classList.remove("hidden");
  RESULTADO.classList.add("flex");
}