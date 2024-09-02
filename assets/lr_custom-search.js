document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const searchResultsContainer = document.querySelector('#search-results');

  if (searchForm && searchInput && searchResultsContainer) {
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const query = searchInput.value;

      fetch(`/search?view=search.ajax&q=${encodeURIComponent(query)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          let resultsHTML = '';

          if (data.results.length > 0) {
            data.results.forEach(result => {
              resultsHTML += `
                <div class="search-result">
                  <a href="${result.url}">
                    ${result.image ? `<img src="${result.image}" alt="${result.title}">` : ''}
                    <h3>${result.title}</h3>
                    ${result.price ? `<p>${result.price}</p>` : ''}
                  </a>
                </div>
              `;
            });
          } else {
            resultsHTML = '<p>No results found</p>';
          }

          searchResultsContainer.innerHTML = resultsHTML;
        })
        .catch(error => {
          //console.error('Error:', error);
          searchResultsContainer.innerHTML = '<p>There was an error fetching the search results. Please try again later.</p>';
        });
    });
  }
});
