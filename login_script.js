// --- ÁREA DE CONFIGURAÇÃO DE CLIENTES (HARDCODED) ---
const USUARIOS_VALIDOS = {
    "familia": "marique10", // Use e-mails como chave se preferir
    "client01@email.com": "5434",
    "client02@email.com": "9897",
    "client03@email.com": "4554" // Corrigido 'clint03' para 'client03' se foi erro
};
// -----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const focusableElements = document.querySelectorAll('.focusable');
    const emailInput = document.getElementById('email'); // Mudado id para 'email'
    const passwordInput = document.getElementById('senha'); // Mantido 'senha' ou mude para 'password' se quiser
    let currentFocusIndex = 0;

    const setFocus = (index) => {
        if (index < 0 || index >= focusableElements.length) return;
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = index;
        focusableElements[currentFocusIndex].classList.add('focused');
        focusableElements[currentFocusIndex].focus();
    };

    document.addEventListener('keydown', (event) => {
         // Só ativa se o login estiver visível (evita conflito com home)
        if (document.getElementById('login-container') && !document.getElementById('login-container').classList.contains('hidden')) {
            switch (event.key) {
                case 'ArrowDown':
                     event.preventDefault();
                    if (currentFocusIndex < focusableElements.length - 1) {
                        setFocus(currentFocusIndex + 1);
                    }
                    break;
                case 'ArrowUp':
                     event.preventDefault();
                    if (currentFocusIndex > 0) {
                        setFocus(currentFocusIndex - 1);
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (focusableElements[currentFocusIndex].id === 'login-button') {
                        loginForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                    }
                    break;
            }
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.textContent = ''; // Limpa erro
        const usuario = emailInput.value; // Pega valor do campo de email
        const senha = passwordInput.value;

        if (USUARIOS_VALIDOS[usuario] && USUARIOS_VALIDOS[usuario] === senha) {
            // LOGIN SUCESSO!
            localStorage.setItem('duckflix_isLoggedIn', 'true'); // Marca como logado
            window.location.replace('home.html'); // Redireciona para home
        } else {
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Foco inicial no primeiro campo
    setFocus(0);
});
