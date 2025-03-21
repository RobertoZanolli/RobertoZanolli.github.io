// GitHub API Integration
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch GitHub repository data
    async function fetchGitHubRepoData(repoUrl) {
        try {
            // Extract username and repo name from GitHub URL
            const urlParts = repoUrl.split('github.com/')[1].split('/');
            const username = urlParts[0];
            const repoName = urlParts[1];
            
            // GitHub API endpoint
            const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
            
            // Fetch repository data
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            return null;
        }
    }
    
    // Function to update project cards with GitHub data
    async function updateProjectCards() {
        const projectCards = document.querySelectorAll('.projectcard');
        
        for (const card of projectCards) {
            // Find GitHub link in the card
            const githubLink = card.querySelector('a[href*="github.com"]');
            
            if (githubLink) {
                const repoUrl = githubLink.getAttribute('href');
                const repoData = await fetchGitHubRepoData(repoUrl);
                
                if (repoData) {
                    // Create or get the GitHub info container
                    let infoContainer = card.querySelector('.github-info');
                    
                    if (!infoContainer) {
                        infoContainer = document.createElement('div');
                        infoContainer.className = 'github-info';
                        
                        // Insert after the description paragraph
                        const description = card.querySelector('p');
                        if (description && description.nextSibling) {
                            card.insertBefore(infoContainer, description.nextSibling);
                        } else {
                            card.appendChild(infoContainer);
                        }
                    }
                    
                    // Format the last update date
                    const lastUpdated = new Date(repoData.updated_at);
                    const formattedDate = lastUpdated.toLocaleDateString();
                    
                    // Update the info container with GitHub data
                    infoContainer.innerHTML = `
                        <div class="github-stats">
                            <span><i class="fa-solid fa-star"></i> ${repoData.stargazers_count} stars</span>
                            <span><i class="fa-solid fa-code-fork"></i> ${repoData.forks_count} forks</span>
                            <span><i class="fa-solid fa-calendar"></i> Updated: ${formattedDate}</span>
                        </div>
                    `;
                }
            }
        }
    }
    
    // Run the update function
    updateProjectCards();
});