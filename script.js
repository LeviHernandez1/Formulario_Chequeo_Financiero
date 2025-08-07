document.addEventListener("DOMContentLoaded", function () {
  // Mostrar preguntas si la primera sección está completa
  window.mostrarPreguntas = function () {
    const nombres = document.getElementById("nombres").value.trim();
    const aPaterno = document.getElementById("aPaterno").value.trim();
    const aMaterno = document.getElementById("aMaterno").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const genero = document.getElementById("genero").value;
    const f_nacimiento = document.getElementById("f_nacimiento").value;

    if (nombres && aPaterno && aMaterno && correo && genero && f_nacimiento) {
      document.getElementById("seccion1").style.display = "none";
      document.getElementById("seccion2").style.display = "block";
    } else {
      alert("Por favor completa todos los campos antes de continuar.");
    }
  };

  // Envío de formulario
  const formulario = document.querySelector("form");
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Calcular puntos totales
    let puntos = 0;
    for (let i = 1; i <= 10; i++) {
      puntos += parseInt(document.getElementById("q" + i).value) || 0;
    }

    // Evaluar resultado
    let resultado = "";
    if (puntos >= 35) {
      resultado = "Bienestar financiero alto";
    } else if (puntos >= 20) {
      resultado = "Bienestar financiero medio";
    } else {
      resultado = "Bienestar financiero bajo";
    }

    // Armar objeto con todos los datos
    const datos = {
      nombre: document.getElementById("nombres").value,
      apellidoP: document.getElementById("aPaterno").value,
      apellidoM: document.getElementById("aMaterno").value,
      correo: document.getElementById("correo").value,
      genero: document.getElementById("genero").value,
      fechaNacimiento: document.getElementById("f_nacimiento").value,
      q1: document.getElementById("q1").value,
      q2: document.getElementById("q2").value,
      q3: document.getElementById("q3").value,
      q4: document.getElementById("q4").value,
      q5: document.getElementById("q5").value,
      q6: document.getElementById("q6").value,
      q7: document.getElementById("q7").value,
      q8: document.getElementById("q8").value,
      q9: document.getElementById("q9").value,
      q10: document.getElementById("q10").value,
      puntos: puntos,
      resultado: resultado
    };

    // Enviar datos a Google Sheets via Apps Script Web App
    const url = "https://script.google.com/macros/s/AKfycbxCKgV7Zz1vpXswZfn2PijDExnQdgLYtGFjhes_5uhGUQJO64zrU27wcOOHHzrQiGCOtg/exec"; // <--- Pega tu URL aquí

    fetch(url, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.text())
      .then((data) => {
        alert("¡Formulario enviado exitosamente!");
        formulario.reset();
        location.reload();
      })
      .catch((err) => {
        console.error("Error al enviar datos:", err);
        alert("Hubo un error al enviar el formulario.");
      });
  });
});
