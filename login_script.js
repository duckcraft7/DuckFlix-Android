// --- ÁREA DE CONFIGURAÇÃO DE CLIENTES (HARDCODED) ---
const USUARIOS_VALIDOS = {
    "familia@duckflix.com": "marique10",
    "teste@duckflix.com": "1234",
};
// -----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    // Verifica se estamos realmente na página de login
    if (!loginForm) return;

    console.log("Login Script: Página de login carregada."); // DIAGNÓSTICO

    const errorMessage = document.getElementById('error-message');
    const focusableElements = document.querySelectorAll('.focusable');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');
    let currentFocusIndex = 0;

    const setFocus = (index) => {
        // (Código de setFocus continua igual)
        if (index < 0 || index >= focusableElements.length) return;
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = index;
        focusableElements[currentFocusIndex].classList.add('focused');
        focusableElements[currentFocusIndex].focus();
    };

    document.addEventListener('keydown', (event) => {
        // (Código de keydown continua igual)
        const loginContainer = document.getElementById('login-container');
        if (loginContainer && !loginContainer.classList.contains('hidden')) {
            let blockDefault = false;
            switch (event.key) {
                case 'ArrowDown':
                    if (currentFocusIndex < focusableElements.length - 1) { setFocus(currentFocusIndex + 1); blockDefault = true; }
                    break;
                case 'ArrowUp':
                    if (currentFocusIndex > 0) { setFocus(currentFocusIndex - 1); blockDefault = true; }
                    break;
                case 'Enter':
                     blockDefault = true;
                    if (focusableElements[currentFocusIndex].id === 'login-button') {
                        loginForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                    } else {
                        if (currentFocusIndex < focusableElements.length - 1) { setFocus(currentFocusIndex + 1); }
                    }
                    break;
            }
             if(blockDefault) event.preventDefault();
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessage.textContent = '';
        const usuario = emailInput.value;
        const senha = passwordInput.value;

        console.log(`Login Script: Tentando login com: ${usuario}`); // DIAGNÓSTICO

        if (USUARIOS_VALIDOS[usuario] && USUARIOS_VALIDOS[usuario] === senha) {
            // LOGIN SUCESSO!
            console.log("Login Script: Login bem-sucedido!"); // DIAGNÓSTICO

            try {
                // **GARANTE QUE SALVOU ANTES DE REDIRECIONAR**
                localStorage.setItem('duckflix_isLoggedIn', 'true');
                console.log("Login Script: Flag 'duckflix_isLoggedIn' salva no localStorage."); // DIAGNÓSTICO

                // **REDIRECIONA PARA HOME**
                console.log("Login Script: Redirecionando para home.html..."); // DIAGNÓSTICO
                window.location.replace('home.html');

            } catch (e) {
                console.error("Login Script: Erro ao salvar no localStorage ou redirecionar:", e); // DIAGNÓSTICO DE ERRO
                errorMessage.textContent = 'Erro interno ao tentar logar.';
            }

        } else {
            console.log("Login Script: Falha no login (usuário/senha inválidos)."); // DIAGNÓSTICO
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Foco inicial
    if(focusableElements.length > 0) setFocus(0);

}); // Fim do DOMContentLoaded
