const YOUR_PUBLIC_KEY = 'WemrfyIJfHWra_G5x'; // Chave Pública
const SERVICE_ID = 'service_n63bk28'; 
const TEMPLATE_ID_RECEPTOR = 'template_3a46ncv'; 
const TEMPLATE_ID_EMISSOR = 'template_j817vp6';

// 1. Inicializa o EmailJS
(function() {
    // Verificação de segurança
    if (typeof emailjs === 'undefined' || typeof emailjs.init !== 'function') {
        console.error("A biblioteca do EmailJS não foi carregada ou está incompleta. Verifique o HTML.");
        return;
    }
    
    emailjs.init(YOUR_PUBLIC_KEY); 
})();

// 2. Adiciona o Listener ao Formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact_form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            // 3. Envio para o Recetor
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_RECEPTOR, form)
                .then(function() {
                    console.log('Sucesso! Notificação enviada para o recetor.');
                    
                    // 4. Envio para o Emissor
                    return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_EMISSOR, form);
                })
                .then(function() {
                    console.log('Sucesso! Confirmação enviada para o emissor.');
                    
                    // 5. Feedback visual e limpeza
                    alert('✅ Mensagem enviada com sucesso! Receberá um e-mail de confirmação.');
                    
                    form.reset();
                })
                .catch(function(error) {
                    console.error('❌ Falha no envio:', error);
                    alert('❌ Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente. Consulte o Console (F12) para detalhes.');
                });
        });
    } else {
        console.error("O formulário com o ID 'contact_form' não foi encontrado no HTML.");
    }
});