document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle removed for minimalist design
    
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
    
    // Language toggle functionality
    const languageToggle = document.getElementById("language-toggle");
    const languageIcon = document.querySelector(".language-toggle-icon");
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem("language") || "it";
    document.documentElement.lang = savedLanguage;
    
    // Set initial language icon
    if (savedLanguage === "en") {
        languageIcon.textContent = "🇬🇧";
    } else {
        languageIcon.textContent = "🇮🇹";
    }
    
    // Apply translations on page load
    applyTranslations(savedLanguage);
    
    // Toggle language when language button is clicked
    if (languageToggle) {
        languageToggle.addEventListener("click", function() {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === "it" ? "en" : "it";
            
            // Update language attribute
            document.documentElement.lang = newLang;
            localStorage.setItem("language", newLang);
            
            // Update icon based on current language
            if (newLang === "en") {
                languageIcon.textContent = "🇬🇧";
            } else {
                languageIcon.textContent = "🇮🇹";
            }
            
            // Apply translations
            applyTranslations(newLang);
        });
    }
});

// Function to apply translations to the page
function applyTranslations(language) {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll("[data-translate]");
    
    elements.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[language] && translations[language][key]) {
            // Handle elements with HTML content
            if (element.innerHTML.includes("<") || translations[language][key].includes("<")) {
                element.innerHTML = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
}

