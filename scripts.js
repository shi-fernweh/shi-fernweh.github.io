// Esperar a que todo el contenido del DOM (HTML) se haya cargado
document.addEventListener("DOMContentLoaded", function() {

    console.log("¡El archivo de scripts está conectado correctamente!");
    
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    
    // Buscar el elemento donde queremos colocar el año y actualizar su texto
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = currentYear;
    }


    // Configuración del observador para la animación de las portadas
    const observerOptions = {
        threshold: 0.15 // Se activa cuando el 15% de la portada es visible en pantalla
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' para disparar la animación CSS
                entry.target.classList.add('visible');
                // Opcional: Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Buscar todos los elementos que tengan la clase 'zoom-in-element' y observarlos
    const hiddenElements = document.querySelectorAll('.zoom-in-element');
    hiddenElements.forEach((el) => observer.observe(el));



    // --- Lógica del Modal de Lectura ---
    const modal = document.getElementById("chapterModal");
    const btn = document.getElementById("openModal");
    const span = document.querySelector(".close-modal");

    if (btn && modal) {
        btn.addEventListener("click", function(e) {
            e.preventDefault(); // <-- ESTA LÍNEA ES LA CLAVE
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        span.addEventListener("click", function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });

        window.addEventListener("click", function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }


    // Lógica para Menú Hamburguesa en Móvil
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            
            // Animación opcional de las rayitas (se cruzan al abrir)
            menuToggle.classList.toggle("is-active");
        });
    }


    // Lógica para envío de formulario por AJAX y Modal de Gracias
    const contactForm = document.querySelector('.contact-form');
    const thanksModal = document.getElementById('thanksModal');
    const closeThanks = document.getElementById('closeThanks');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Evita que la página se recargue

            const data = new FormData(this);
            const response = await fetch(this.action, {
                method: this.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Si el envío fue exitoso
                this.reset(); // Limpia los campos del formulario
                thanksModal.style.display = "block"; // Muestra el modal de gracias
                document.body.style.overflow = "hidden"; // Bloquea scroll
            } else {
                // Si algo falla
                alert("Huy, hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.");
            }
        });
    }

    // Cerrar el modal de gracias
    if (closeThanks) {
        closeThanks.onclick = function() {
            thanksModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }


    const backBtn = document.getElementById("dynamicBackBtn");
    
    // document.referrer guarda la URL de la página de la que viene el usuario
    const previousPage = document.referrer; 

    // Verificamos si el botón existe para que no de error en otras páginas
    if (backBtn) {
        if (previousPage.includes("series.html")) {
            // Si viene de series, cambiamos la ruta y el texto
            backBtn.href = "../series.html";
            backBtn.textContent = "← Volver a Series";
        } else {
            // Si viene de libros, o de un link externo directo (Instagram, etc.),
            // lo dejamos con el default que ya pusimos en el HTML: Volver a Libros.
            backBtn.href = "../libros.html";
            backBtn.textContent = "← Volver a Libros";
        }
    }


});


