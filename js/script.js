/* =========================================================
   BrosCode Tech Solutions
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector("header, .navbar, nav");

    const handleNavbarScroll = () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    /* =====================================================
       2. SMOOTH SCROLL
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       3. MOBILE MENU
       ===================================================== */

    const menuButton = document.querySelector(
        ".menu-toggle, .hamburger, .mobile-menu-toggle"
    );

    const mobileMenu = document.querySelector(
        ".nav-links, .navigation, .mobile-nav"
    );

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("active");
            mobileMenu.classList.toggle("active");

        });

        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuButton.classList.remove("active");
                mobileMenu.classList.remove("active");

            });

        });

    }


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .service-card, .project-card, .about-content, .section-title"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       5. BUTTON CLICK HANDLING
       ===================================================== */

    const projectButtons = document.querySelectorAll(
        'a[href="#contact"], .start-project, .project-btn'
    );

    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const contactSection =
                document.querySelector("#contact");

            if (contactSection) {

                setTimeout(() => {

                    contactSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }, 50);

            }

        });

    });


    /* =====================================================
       6. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(
        'nav a[href^="#"], .nav-links a[href^="#"]'
    );

    if (sections.length && navLinks.length) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink = document.querySelector(
                            `a[href="#${entry.target.id}"]`
                        );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       7. CONTACT FORM
       ===================================================== */

    const contactForm = document.querySelector(
        "#contactForm, .contact-form form"
    );

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const formData = new FormData(contactForm);

            let hasValue = false;

            for (const value of formData.values()) {

                if (String(value).trim() !== "") {
                    hasValue = true;
                    break;
                }

            }

            if (!hasValue) {

                alert("Please fill in the form before submitting.");

                return;

            }

            alert(
                "Thank you for contacting BrosCode Tech Solutions. We will get back to you soon."
            );

            contactForm.reset();

        });

    }


    /* =====================================================
       8. CURRENT YEAR
       ===================================================== */

    const yearElements = document.querySelectorAll(
        "#currentYear, .current-year"
    );

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       9. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons = document.querySelectorAll(
        "button, .btn, .button"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            const size = Math.max(
                rect.width,
                rect.height
            );

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =====================================================
       10. PAGE LOADED
       ===================================================== */

    document.body.classList.add("page-loaded");

    console.log(
        "BrosCode Tech Solutions website loaded successfully."
    );

});

/* =========================================
   PROJECT ENQUIRY FORM
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const projectForm = document.getElementById("projectForm");

    if (!projectForm) return;


    projectForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const company = document.getElementById("company").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const budget = document.getElementById("budget").value;
        const message = document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            alert("Please fill in all required fields.");

            return;
        }


        const subject =
            "BrosCode Project Enquiry - " + name;


        const body =
            `Hello BrosCode Tech Solutions,

I would like to discuss a project with you.

--------------------------------
CLIENT DETAILS
--------------------------------

Name: ${name}
Company / Business: ${company || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}

--------------------------------
PROJECT DETAILS
--------------------------------

Service: ${service || "Not specified"}
Estimated Budget: ${budget || "Not specified"}

Project Requirements:

${message}

--------------------------------

Looking forward to hearing from you.

Regards,
${name}`;


        const mailtoLink =
            "mailto:contact@broscodetech.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);


        window.location.href = mailtoLink;


        /* ---------------------------------
           Success UI
        --------------------------------- */

        setTimeout(function () {

            projectForm.innerHTML = `
                <div class="form-success">

                    <h3>Thank You.</h3>

                    <p>
                        Your project enquiry has been prepared.
                        Your email application should open shortly.
                    </p>

                </div>
            `;

        }, 500);

    });

});