// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada dos elementos quando ficam visíveis
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observar membros da equipe
document.querySelectorAll('.team-member').forEach(member => {
    observer.observe(member);
});

// Observar features
document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
});

// Header sticky com efeito de fade
const header = document.querySelector('.sticky-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter apenas a mensagem do formulário
        const message = contactForm.querySelector('textarea').value;
        
        // Número do WhatsApp da empresa
        const phoneNumber = '+554837213620';
        
        // Criar link do WhatsApp com apenas a mensagem
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
        
        // Limpar formulário
        contactForm.reset();
    });
}

// Recriar ícones do Lucide
lucide.createIcons(); 