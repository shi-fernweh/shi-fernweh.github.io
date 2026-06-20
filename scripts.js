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
            e.preventDefault(); 
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        if(span) {
            span.addEventListener("click", function() {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }

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
            menuToggle.classList.toggle("is-active");
        });
    }

    // --- Lógica de Botón Volver ---
    const backBtn = document.getElementById("dynamicBackBtn");
    const previousPage = document.referrer; 

    if (backBtn) {
        if (previousPage.includes("series.html")) {
            backBtn.href = "../series.html";
            backBtn.textContent = "← Volver a Series";
        } else {
            backBtn.href = "../libros.html";
            backBtn.textContent = "← Volver a Libros";
        }
    }

    // =========================================================================
    // --- LÓGICA UNIFICADA PARA EL FORMULARIO DE CONVOCATORIA / COLABORACIÓN ---
    // =========================================================================
    const arcForm = document.getElementById('arc-form');
    const thanksModal = document.getElementById('thanksModal');
    const closeThanks = document.getElementById('closeThanks');

    if (arcForm) {
        arcForm.addEventListener('submit', async function(e) {
            // 1. ESTO EVITA LA PANTALLA NEGRA
            e.preventDefault();
            
            // 2. Capturamos los datos
            const formData = new FormData(arcForm);
            
            // Opcional: Cambiar el texto del botón mientras se envía para que el usuario sepa que está cargando
            const submitBtn = arcForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            if(submitBtn) {
                submitBtn.textContent = "ENVIANDO...";
                submitBtn.style.opacity = "0.7";
                submitBtn.disabled = true;
            }

            try {
                // 3. Enviamos los datos usando la URL que ya tienes en el atributo "action" de tu HTML
                const response = await fetch(arcForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // 4. Si todo sale bien, mostramos tu modal de agradecimiento
                    if (thanksModal) {
                        thanksModal.style.display = "block";
                        document.body.style.overflow = "hidden"; // Bloquea scroll del fondo
                    }
                    arcForm.reset(); // Limpiamos el formulario
                } else {
                    alert("Hubo un error al enviar tu propuesta. Inténtalo de nuevo.");
                }
            } catch (error) {
                console.error('Error en el envío:', error);
                alert("Hubo un problema de conexión. Por favor, revisa tu internet e inténtalo de nuevo.");
            } finally {
                // 5. Restauramos el botón a la normalidad
                if(submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = "1";
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Lógica para cerrar el modal de gracias
    if (closeThanks && thanksModal) {
        closeThanks.onclick = function() {
            thanksModal.style.display = "none";
            document.body.style.overflow = "auto"; // Restaura el scroll
        }
        
        // También cerramos el modal si hacen clic fuera de la cajita blanca
        window.addEventListener("click", function(event) {
            if (event.target == thanksModal) {
                thanksModal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

});