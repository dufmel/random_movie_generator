// Function to parse the Excel sheet data
function parseMovies(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const movies = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    displayMovies(movies);
  };
  
  reader.readAsArrayBuffer(file);
}

// Function to display the parsed movies
function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';
  
  movies.forEach(function(movie) {
    const title = movie[0];
    const category = movie[1].toLowerCase();
    const platform = movie[2]
    
    const movieElement = document.createElement('p');
    movieElement.textContent = 'Time to watch a ' + category + " flick called " + '"' + title + '"' + ' on ' + platform + ". Grab some popcorn and enjoy!";
    
    movieList.appendChild(movieElement);
  });

  // Hide the parsed list
  movieList.classList.add('hidden');
  
  // Show the "Generate Random Movie" button
  document.getElementById('random-movie-btn').classList.remove('hidden');
  
  // Hide the "Parse" button
  document.getElementById('parse-btn').classList.add('hidden');
  
  // Show an alert to let the user know that the list has been parsed
  alert('List parsed successfully!');
}

// Function to generate a random movie from the list
function generateRandomMovie() {
  const movies = document.getElementById('movie-list').getElementsByTagName('p');
  
  if (movies.length > 0) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex].textContent;
    
    document.getElementById('random-movie').textContent = randomMovie;
  }
}

// Event listeners
document.getElementById('parse-btn').addEventListener('click', function() {
  const fileInput = document.getElementById('file-input');
  
  if (fileInput.files.length > 0) {
    parseMovies(fileInput.files[0]);
  }
});

document.getElementById('random-movie-btn').addEventListener('click', generateRandomMovie);