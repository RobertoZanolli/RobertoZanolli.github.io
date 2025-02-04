document.addEventListener("DOMContentLoaded", function() {
    const headings = document.querySelectorAll('h1, h2, p');

    headings.forEach(function(heading) {
        heading.classList.add('fade-in');
    });

    // Avvia l'animazione dopo un breve ritardo
    setTimeout(function() {
        headings.forEach(function(heading) {
            heading.classList.add('show');
        });
    }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Toggle del menu quando si clicca sul pulsante hamburger
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    // Chiudi il menu quando si clicca su un link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navList.classList.remove("active");
        });
    });
});

