document.addEventListener("DOMContentLoaded", function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Toggle menu when hamburger button is clicked
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navList.classList.remove("active");
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-toggle-icon");
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-theme");
        themeIcon.textContent = "☀️";
    } else {
        // Ensure dark theme is properly set as default
        body.classList.remove("light-theme");
        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
    
    // Toggle theme when theme button is clicked
    themeToggle.addEventListener("click", function() {
        body.classList.toggle("light-theme");
        
        // Update icon based on current theme
        if (body.classList.contains("light-theme")) {
            themeIcon.textContent = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            themeIcon.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });
});

