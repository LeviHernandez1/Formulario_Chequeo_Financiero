<script>
function mostrarPreguntas() {
    const correo = document.getElementById("correo").value.trim();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(correo)){
        alert("Por favor, ingresa un correo electrónico válido.");
        return; 
    }
    document.getElementById("seccion1").style.display = "none";
    document.getElementById("seccion2").style.display= "block";
}
</script>