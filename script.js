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