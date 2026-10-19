const scriptURL = ""; //// Aquí debes colocar la URL del script de Google Apps Script que manejará el envío del formulario
const form = document.getElementById("form-validation");
const btnRegistrar = document.getElementById("btnRegistrar");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) return;

    btnRegistrar.disabled = true;
    btnRegistrar.value = "Enviando...";

    const params = new URLSearchParams(new FormData(form));

    fetch(scriptURL, { method: "POST", body: params })
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta del servidor");
            alert("¡Formulario enviado con éxito!");
            form.reset();
            form.classList.remove("was-validated");
        })
        .catch(error => {
            console.error("Error completo:", error);
            alert("Ocurrió un error: " + error.message);
        })
        .finally(() => {
            btnRegistrar.disabled = false;
            btnRegistrar.value = "Registrar";
        });
});

const btnDescargar = document.getElementById("btnDescargarExcel");
btnDescargar.addEventListener("click", () => {
    window.open("", "_blank"); /// Aquí puedes colocar la URL del archivo Excel que deseas descargar
});