document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const edadInput = document.getElementById('edad');
  const submitBtn = document.getElementById('submitBtn');

  // Mensajes de error
  const errores = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    edad: ''
  };

  // Función para validar nombre
  function validarNombre() {
    const valor = nombreInput.value.trim();
    if (valor.length < 3) {
      errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
      return false;
    } else {
      errores.nombre = '';
      return true;
    }
  }

  // Función para validar email
  function validarEmail() {
    const valor = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(valor)) {
      errores.email = 'Formato de correo inválido.';
      return false;
    } else {
      errores.email = '';
      return true;
    }
  }

  // Función para validar contraseña
  function validarPassword() {
    const valor = passwordInput.value;
    const tieneNumero = /\d/.test(valor);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
    if (valor.length < 8 || !tieneNumero || !tieneEspecial) {
      errores.password = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.';
      return false;
    } else {
      errores.password = '';
      return true;
    }
  }

  // Función para validar confirmación de contraseña
  function validarConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      errores.confirmPassword = 'Las contraseñas no coinciden.';
      return false;
    } else {
      errores.confirmPassword = '';
      return true;
    }
  }

  // Función para validar edad
  function validarEdad() {
    const valor = parseInt(edadInput.value, 10);
    if (isNaN(valor) || valor < 18) {
      errores.edad = 'Debes tener al menos 18 años.';
      return false;
    } else {
      errores.edad = '';
      return true;
    }
  }

  // Actualizar estado visual de un campo
  function actualizarEstado(input, esValido) {
    input.classList.remove('valid', 'invalid');
    if (input.value === '') return; // No marcar si está vacío
    input.classList.add(esValido ? 'valid' : 'invalid');
  }

  // Mostrar mensaje de error
  function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
  }

  // Verificar si todos los campos son válidos
  function todosValidos() {
    return Object.values(errores).every(error => error === '');
  }

  // Actualizar botón de envío
  function actualizarBotonEnvio() {
    submitBtn.disabled = !todosValidos();
  }

  // Configurar validaciones en tiempo real
  nombreInput.addEventListener('input', () => {
    const valido = validarNombre();
    actualizarEstado(nombreInput, valido);
    mostrarError('errorNombre', errores.nombre);
    actualizarBotonEnvio();
  });

  emailInput.addEventListener('input', () => {
    const valido = validarEmail();
    actualizarEstado(emailInput, valido);
    mostrarError('errorEmail', errores.email);
    actualizarBotonEnvio();
  });

  passwordInput.addEventListener('input', () => {
    const passValido = validarPassword();
    actualizarEstado(passwordInput, passValido);
    mostrarError('errorPassword', errores.password);

    // Revalidar confirmación si ya hay algo escrito
    if (confirmPasswordInput.value) {
      const confirmValido = validarConfirmPassword();
      actualizarEstado(confirmPasswordInput, confirmValido);
      mostrarError('errorConfirmPassword', errores.confirmPassword);
    }

    actualizarBotonEnvio();
  });

  confirmPasswordInput.addEventListener('input', () => {
    const valido = validarConfirmPassword();
    actualizarEstado(confirmPasswordInput, valido);
    mostrarError('errorConfirmPassword', errores.confirmPassword);
    actualizarBotonEnvio();
  });

  edadInput.addEventListener('input', () => {
    const valido = validarEdad();
    actualizarEstado(edadInput, valido);
    mostrarError('errorEdad', errores.edad);
    actualizarBotonEnvio();
  });

  // Manejo del envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todosValidos()) {
      alert('¡Formulario enviado correctamente!');
      // Aquí podrías enviar los datos a un servidor
    }
  });

  // Reiniciar estilos y errores al hacer reset
  form.addEventListener('reset', () => {
    setTimeout(() => {
      // Limpiar clases y mensajes tras el reset nativo
      [nombreInput, emailInput, passwordInput, confirmPasswordInput, edadInput].forEach(input => {
        input.classList.remove('valid', 'invalid');
      });
      Object.keys(errores).forEach(key => {
        errores[key] = '';
        mostrarError(`error${key.charAt(0).toUpperCase() + key.slice(1)}`, '');
      });
      submitBtn.disabled = true;
    }, 10);
  });
});
