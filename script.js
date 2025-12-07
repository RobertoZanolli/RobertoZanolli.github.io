document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // --- Theme Handling --- 
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Apply the saved theme or the system preference on initial load
    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Listener for the theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let targetTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // Listener for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if no theme is explicitly set by the user
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Slider Handling ---
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev');
        const nextBtn = sliderContainer.querySelector('.next');
        let currentIndex = 0;

        function showSlide(index) {
            slider.style.transform = `translateX(-${index * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            showSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            showSlide(currentIndex);
        });

        // Initialize slider
        showSlide(currentIndex);
    }

    // --- Quotes Handling (only on quotes page) --- 
    const quotesContainer = document.getElementById('quotes-container');
    if (quotesContainer) {
        fetchAndDisplayQuotes();
    }
});

async function fetchAndDisplayQuotes() {
    const quotesContainer = document.getElementById('quotes-container');
    const cacheKey = 'dailyQuotes';
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    const now = new Date().getTime();
    
    // Fallback quotes in case the API is unavailable
    const fallbackQuotes = [
      { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
      { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" },
      { q: "The future belongs to those who believe in the beauty of their dreams.", a: "Eleanor Roosevelt" },
      { q: "In the middle of difficulty lies opportunity.", a: "Albert Einstein" },
      { q: "Success is not final, failure is not fatal: It is the courage to continue that counts.", a: "Winston Churchill" },
      { q: "The best way to predict the future is to create it.", a: "Peter Drucker" },
      { q: "Believe you can and you're halfway there.", a: "Theodore Roosevelt" },
      { q: "It does not matter how slowly you go as long as you do not stop.", a: "Confucius" },
      { q: "Everything you've ever wanted is on the other side of fear.", a: "George Addair" },
      { q: "The only limit to our realization of tomorrow is our doubts of today.", a: "Franklin D. Roosevelt" }
    ];
    
    // Function to get a random fallback quote as an array for consistency
    function getRandomFallbackQuote() {
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      return [fallbackQuotes[randomIndex]]; // Return as array to match API format
    }

    if (!quotesContainer) return; // Exit if container not found
    quotesContainer.innerHTML = '<p>Loading quote...</p>'; // Loading indicator

    // Check if cache exists and is less than a day old
    if (cachedData && (now - cachedData.timestamp < oneDay)) {
        console.log("Using cached quote");
        displayQuotes(cachedData.quotes);
    } else {
        console.log("Fetching a new quote");
        
        // Try with API first, then fallback to local quotes
        try {
            const apiUrl = 'https://zenquotes.io/api/random';
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const quotes = await response.json();
            
            if (!Array.isArray(quotes) || quotes.length === 0 || !quotes[0].q || !quotes[0].a) {
                 console.warn("Received unexpected data format from API:", quotes);
                 throw new Error("Invalid response format");
            }

            // Store the quotes and timestamp in localStorage
            localStorage.setItem(cacheKey, JSON.stringify({ quotes: quotes, timestamp: now }));
            displayQuotes(quotes);

        } catch (error) {
            console.error("Error fetching quotes:", error);
            
            const fallbackQuote = getRandomFallbackQuote();
            console.log("Using fallback quote:", fallbackQuote);
            
            // Store the fallback quote in cache to avoid repeated failures
            localStorage.setItem(cacheKey, JSON.stringify({ quotes: fallbackQuote, timestamp: now }));
            displayQuotes(fallbackQuote);
        }
    }
}

function displayQuotes(quotes) {
    const quotesContainer = document.getElementById('quotes-container');
    if (!quotesContainer || !Array.isArray(quotes)) return;

    quotesContainer.innerHTML = ''; // Clear loading/previous quotes
    // ZenQuotes returns an array, usually with one quote object for /api/today
    quotes.forEach(quote => { 
        const blockquote = document.createElement('blockquote');
        const p = document.createElement('p');
        // Use 'q' field from zenquotes API for the quote text, force lowercase per request
        const quoteText = (quote.q || '').toLowerCase();
        p.textContent = `"${quoteText}"`; 
        const cite = document.createElement('cite');
        // Use 'a' field for the author, lowercase and provide default if null
        cite.textContent = (quote.a || 'unknown').toLowerCase(); 
        
        blockquote.appendChild(p);
        blockquote.appendChild(cite);
        quotesContainer.appendChild(blockquote);
    });
}

