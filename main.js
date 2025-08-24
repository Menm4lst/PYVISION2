import config from './config.js';

// Utilidades
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Inicialización
const init = () => {
    initAOS();
    setupSiteConfig();
    setupMobileMenu();
    setupScrollAnimation();
    setupContactForm();
    setupSocialLinks();
};

// Configuración de AOS
const initAOS = () => {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
};

// Configuración del sitio
const setupSiteConfig = () => {
    document.title = config.siteName;
    $('.nav-brand').textContent = config.siteName;
};

// Menú móvil
const setupMobileMenu = () => {
    const menuBtn = $('.menu-btn');
    const mobileMenu = $('.mobile-menu');
    const mobileLinks = $$('.mobile-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });
};

// WhatsApp
const consultarServicio = (nombreServicio) => {
    const mensaje = `Hola, me interesa el servicio de ${nombreServicio}. ¿Podrían brindarme más información y una cotización?`;
    const url = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
};
window.consultarServicio = consultarServicio;

// Animación del scroll
const setupScrollAnimation = () => {
    const nav = $('nav');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('py-2');
            nav.classList.add('py-4');
            return;
        }
        
        nav.classList.toggle('-translate-y-full', currentScroll > lastScroll);
        
        if (currentScroll > 100) {
            nav.classList.remove('py-4');
            nav.classList.add('py-2');
        }
        
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Enlaces de redes sociales
const setupSocialLinks = () => {
    $$('footer .social-links a').forEach(link => {
        const icon = link.querySelector('i');
        const socialName = 
            icon.classList.contains('fa-facebook') ? 'facebook' :
            icon.classList.contains('fa-instagram') ? 'instagram' :
            icon.classList.contains('fa-twitter') ? 'twitter' : null;

        if (socialName && config.social[socialName]) {
            link.href = config.social[socialName];
        }
    });
};

// Formulario de contacto
const setupContactForm = () => {
    const form = $('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: $('#nombre').value,
            telefono: $('#telefono').value,
            email: $('#email').value,
            servicio: $('#servicio').value,
            mensaje: $('#mensaje').value
        };
        
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo a la brevedad.');
        form.reset();
    });
};

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
