// Aguarda o DOM carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // Animação de contagem dos títulos (Counter Animation)
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidade da animação (quanto menor, mais rápido)

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                // Pega o número final desejado no atributo data-target
                const target = +counter.getAttribute('data-target');
                // Pega o número atual da tela
                const count = +counter.innerText;

                // Calcula o incremento
                const inc = target / speed;

                // Se o número atual for menor que o alvo, incrementa
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 100);
                } else {
                    counter.innerText = target + "x"; // Adiciona o 'x' no final (ex: 3x, 6x)
                }
            };
            updateCount();
        });
    };

    // Intersection Observer para iniciar a animação apenas quando a seção de títulos aparecer na tela
    const section = document.querySelector('.titulos-section');
    
    const observerOptions = {
        root: null,
        threshold: 0.5 // Ativa quando 50% da seção estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Para de observar após animar uma vez
            }
        });
    }, observerOptions);

    if(section) {
        observer.observe(section);
    }
});