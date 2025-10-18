// --- ÁREA DE CONFIGURAÇÃO DE CLIENTES (HARDCODED) ---
const USUARIOS_VALIDOS = {
    "familia@duckflix.com": "marique10", // Use e-mails como chave se preferir
    "client01@duckflix.com": "3214", // Exemplo
    // Adicione mais usuários aqui
};
// -----------------------------------------

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos realmente na página de login antes de rodar
    const loginForm = document.getElementById('login-form');
    if (!loginForm) {
        // console.log("Não está na página de login, script de login inativo.");
        return; // Sai se não encontrar o formulário
    }

    // console.log("Script de login iniciado.");
    const errorMessage = document.getElementById('error-message');
    const focusableElements = document.querySelectorAll('.focusable');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');
    let currentFocusIndex = 0;

    const setFocus = (index) => {
        if (index < 0 || index >= focusableElements.length) return;
        // console.log(`Mudando foco de ${currentFocusIndex} para ${index}`);
        focusableElements[currentFocusIndex].classList.remove('focused');
        currentFocusIndex = index;
        focusableElements[currentFocusIndex].classList.add('focused');
        focusableElements[currentFocusIndex].focus(); // Tenta focar o elemento real
    };

    document.addEventListener('keydown', (event) => {
        // Só executa se o login estiver visível (evita conflito com home)
        const loginContainer = document.getElementById('login-container');
        if (loginContainer && !loginContainer.classList.contains('hidden')) {
            // console.log("Keydown no login:", event.key);
            let blockDefault = false; // Flag para bloquear ou não
            switch (event.key) {
                case 'ArrowDown':
                    if (currentFocusIndex < focusableElements.length - 1) {
                        setFocus(currentFocusIndex + 1);
                        blockDefault = true;
                    }
                    break;
                case 'ArrowUp':
                    if (currentFocusIndex > 0) {
                        setFocus(currentFocusIndex - 1);
                        blockDefault = true;
                    }
                    break;
                case 'Enter':
                     blockDefault = true; // Sempre previne o Enter padrão aqui
                    if (focusableElements[currentFocusIndex].id === 'login-button') {
                        // console.log("Enter no botão, disparando submit.");
                        // Dispara o evento submit no formulário
                        loginForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                    } else {
                        // Se Enter for pressionado em um input, move para o próximo (ou botão)
                        if (currentFocusIndex < focusableElements.length - 1) {
                           setFocus(currentFocusIndex + 1);
                        }
                    }
                    break;
            }
             if(blockDefault) {
                event.preventDefault(); // Previne rolagem ou submit padrão apenas se necessário
             }
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
        errorMessage.textContent = ''; // Limpa erro
        const usuario = emailInput.value;
        const senha = passwordInput.value;

        // console.log(`Tentando login com: ${usuario} / ${senha}`);

        if (USUARIOS_VALIDOS[usuario] && USUARIOS_VALIDOS[usuario] === senha) {
            // LOGIN SUCESSO!
            // console.log("Login bem-sucedido!");
            localStorage.setItem('duckflix_isLoggedIn', 'true'); // Marca como logado
            window.location.replace('home.html'); // Redireciona para home (replace não deixa no histórico)
        } else {
            // console.log("Falha no login.");
            errorMessage.textContent = 'Usuário ou senha inválidos.';
        }
    });

    // Foco inicial no primeiro campo (garantido após tudo carregar)
    if(focusableElements.length > 0) {
        setFocus(0);
    } else {
        console.warn("Nenhum elemento focável encontrado no login.");
    }
});
