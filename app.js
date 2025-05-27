const testimonials = [
    {
        text: '"Facilis nemo molestias eum eligendi assumenda consequuntur, alias cumque fugit tenetur laudantium in dolores delectus temporibus magni quae est quaerat, deleniti repellat provident veniam reiciendis atque neque! Optio eaque eveniet accusantium nesciunt omnis eum quidem sint odio molestiae dolore est aut laborum laudantium voluptates, rerum, architecto et."',
        author: 'Patrícia, Jornalista',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
        text: '"Excelente serviço! A viagem para Barcelona superou todas as minhas expectativas. A equipe da Buenas Viagens foi muito atenciosa e profissional do início ao fim."',
        author: 'Carlos, Engenheiro',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    {
        text: '"Minha família e eu adoramos nossa viagem para Suíça. Tudo foi perfeitamente organizado e não tivemos nenhuma preocupação. Certamente viajaremos novamente com a Buenas Viagens!"',
        author: 'Ana, Professora',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    }
];

let currentTestimonial = 0;

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    initTestimonialSlider();
    
    initSearchForm();
    
    initNewsletterForm();
    
    initDestinoCards();
    
    initSmoothScroll();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function initTestimonialSlider() {
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    const testimonialImage = document.querySelector('.testimonial-image img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialText && testimonialAuthor && testimonialImage && prevBtn && nextBtn) {
        function updateTestimonial() {
            testimonialText.classList.add('fade-out');
            testimonialAuthor.classList.add('fade-out');
            testimonialImage.classList.add('fade-out');
            
            setTimeout(() => {
                testimonialText.textContent = testimonials[currentTestimonial].text;
                testimonialAuthor.textContent = testimonials[currentTestimonial].author;
                testimonialImage.src = testimonials[currentTestimonial].image;
                
                testimonialText.classList.remove('fade-out');
                testimonialAuthor.classList.remove('fade-out');
                testimonialImage.classList.remove('fade-out');
            }, 300);
        }
        
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }, 5000);
        
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-text, .testimonial-author, .testimonial-image img {
                transition: opacity 0.3s ease;
            }
            .fade-out {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
}

function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchForm && searchBtn) {
        searchBtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            const destino = document.getElementById('destino').value;
            const quando = document.getElementById('quando').value;
            const retorno = document.getElementById('retorno').value;
            
            if (!destino || !quando) {
                alert('Por favor, preencha pelo menos o destino e a data de ida.');
                return;
            }
            
            console.log('Busca realizada:', { destino, quando, retorno });
            alert(`Buscando viagens para ${destino}!`);
        });
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email || !email.includes('@')) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            console.log('Email cadastrado:', email);
            alert('Obrigado por se inscrever em nossa newsletter!');
            
            emailInput.value = '';
        });
    }
}

function initDestinoCards() {
    const destinoCards = document.querySelectorAll('.destino-card');
    
    destinoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            
            const img = this.querySelector('.destino-img img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
            
            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.backgroundColor = 'var(--secondary-color)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            const img = this.querySelector('.destino-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            const btn = this.querySelector('.btn');
            if (btn) {
                btn.style.backgroundColor = 'var(--primary-color)';
            }
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}