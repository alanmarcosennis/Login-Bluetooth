// Lógica JavaScript para mostrar u ocultar los formularios y enviar las peticiones HTTP a la API

const loginContainer = document.getElementById("loginContainer");
const registerContainer = document.getElementById("registerContainer");
const successMessage = document.getElementById("successMessage");
const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const backToLoginLink = document.getElementById("backToLoginLink");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showLoginContainer = () => {
  loginContainer.style.display = "block";
  registerContainer.style.display = "none";
  successMessage.style.display = "none";
};

const showRegisterContainer = () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
  successMessage.style.display = "none";
};

const showSuccessMessage = () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "none";
  successMessage.style.display = "block";
};

const registerUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:390/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);
    // Mostrar mensaje de éxito
    showSuccessMessage();
  } catch (error) {
    console.error(error);
    // Manejar errores de conexión o errores en el servidor
  }
};

const loginUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch("http://localhost:390/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);
    // Redirigir al usuario a la página principal o mostrar un mensaje de éxito en la interfaz de usuario
    if (result.status === "success") {
        // Redirigir al usuario a la página de archivos con Bluetooth
        window.location.href = "bluetooth.html";
      } else {
        // Mostrar mensaje de error en la interfaz de usuario
      }
  } catch (error) {
    console.error(error);
    // Manejar errores de conexión o errores en el servidor
  }
};

loginLink.addEventListener("click", showLoginContainer);
registerLink.addEventListener("click", showRegisterContainer);
backToLoginLink.addEventListener("click", showLoginContainer);
registerForm.addEventListener("submit", registerUser);
loginForm.addEventListener("submit", loginUser);
