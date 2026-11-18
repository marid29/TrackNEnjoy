import axios from 'axios';

const OMDB_API_KEY = '4d5427c5'; 
const OMDB_BASE_URL = 'https://www.omdbapi.com';
const GOOGLE_BOOKS_API_KEY = 'AIzaSyCKhiFJmf2KXyI2H2HmFzCqpJtAwJ894to';
const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Lista de términos de búsqueda

const movieSearchTerms = [
    'The Parent Trap',
    'Toy Story',
    'Mamma Mia',
    'Star Wars',
    'Titanic',
    'The Davinci Code',
    'High School Musical',
    'The Blind Side',
    'Home Alone',
    'Mary Poppins'
];
const seriesSearchTerms = [
    'Breaking Bad',
    'Game of Thrones',
    'The Mentalist',
    'The Crown',
    'The Office',
    'Friends',
    'The Mandalorian',
    'Black Mirror',
    'The Big Bang Theory',
    'Outer Banks'
];
const bookSearchTerms = [
    'Harry Potter',
    'The Lord of the Rings',
    'To Kill a Mockingbird',
    '1984',
    'The Great Gatsby',
    'Pride and Prejudice',
    'The Catcher in the Rye',
    'The Hobbit',
    'Fahrenheit 451',
    'The Da Vinci Code'
];

const omdbService = {
    async searchMovies(query) {
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: OMDB_API_KEY,
                s: query,
                type: 'movie'
            }
        });
        //return response.data.Search; NUEVO!!!
        const movies = response.data.Search;
        if (movies) {
            const detailedMovies = await Promise.all(movies.map(async (movie) => {
                const details = await axios.get(OMDB_BASE_URL, {
                    params: {
                        apikey: OMDB_API_KEY,
                        i: movie.imdbID
                    }
                });
                return { ...movie, Genre: details.data.Genre };
            }));
            return detailedMovies;
        }
        return [];
    },
    async searchSeries(query) {
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: OMDB_API_KEY,
                s: query,
                type: 'series'
            }
        });
        //return response.data.Search; NUEVO!!!
        const series = response.data.Search;
        if (series) {
            const detailedSeries = await Promise.all(series.map(async (serie) => {
                const details = await axios.get(OMDB_BASE_URL, {
                    params: {
                        apikey: OMDB_API_KEY,
                        i: serie.imdbID
                    }
                });
                return { ...serie, Genre: details.data.Genre };
            }));
            return detailedSeries;
        }
        return [];
    },
    async searchBooks(query) {
        const response = await axios.get(GOOGLE_BOOKS_BASE_URL, {
            params: {
                q: query,
                key: GOOGLE_BOOKS_API_KEY
            }
        });
        //return response.data.items; NUEVO!!!
        const books = response.data.items;
        if (books) {
            return books.map(book => {
                const genre = book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Desconocido';
                return {
                    ...book,
                    Genre: genre
                };
            });
        }
        return [];
    },
    async searchBooksByGenre(genre, limit = 5) {
        const response = await axios.get(GOOGLE_BOOKS_BASE_URL, {
            params: {
                q: `subject:${genre}`, // Filtro por género usando `subject`
                key: GOOGLE_BOOKS_API_KEY
            }
        });
        const books = response.data.items || [];
        return books.slice(0, limit).map(book => {
            const genre = book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Desconocido';
            return {
                ...book,
                Genre: genre
            };
        });
    },
    async getRandomMovies(count) {
        let results = [];
        let selectedIds = new Set();
        while (results.length < count) {
            const randomTerm = movieSearchTerms[Math.floor(Math.random() * movieSearchTerms.length)];
            const response = await axios.get(OMDB_BASE_URL, {
                params: {
                    apikey: OMDB_API_KEY,
                    s: randomTerm,
                    type: 'movie'
                }
            });
            const movies = response.data.Search;
            if (movies && movies.length > 0) {
                for (let i = 0; i < movies.length && results.length < count; i++) {
                    const randomIndex = Math.floor(Math.random() * movies.length);
                    const movie = movies[randomIndex];
                    if (!selectedIds.has(movie.imdbID)) {
                        selectedIds.add(movie.imdbID); 
                        results.push(movie);
                    }
                }
            }
        }
        return results;
    },
    async getRandomSeries(count) {
        let results = [];
        let selectedIds = new Set();
        while (results.length < count) {
            const randomTerm = seriesSearchTerms[Math.floor(Math.random() * seriesSearchTerms.length)];
            const response = await axios.get(OMDB_BASE_URL, {
                params: {
                    apikey: OMDB_API_KEY,
                    s: randomTerm,
                    type: 'series'
                }
            });
            const series = response.data.Search;
            if (series && series.length > 0) {
                for (let i = 0; i < series.length && results.length < count; i++) {
                    const randomIndex = Math.floor(Math.random() * series.length);
                    const serie = series[randomIndex];
                    if (!selectedIds.has(serie.imdbID)) {
                        selectedIds.add(serie.imdbID);
                        results.push(serie);
                    }
                }
            }
        }
        return results;
    },
    async getRandomBooks(count) {
        let results = [];
        let selectedIds = new Set();
    
        while (results.length < count) {
            const randomTerm = bookSearchTerms[Math.floor(Math.random() * bookSearchTerms.length)];
            const response = await axios.get(GOOGLE_BOOKS_BASE_URL, {
                params: {
                    q: randomTerm,
                    key: GOOGLE_BOOKS_API_KEY
                }
            });
    
            const books = response.data.items;
            if (books && books.length > 0) {
                for (let book of books) {
                    const bookId = book.id; 
                    if (!selectedIds.has(bookId) && results.length < count) {
                        selectedIds.add(bookId);
                        results.push(book);
                    }
                }
            }
        }
        return results;
    },
// Dentro de omdbService.js
async searchMoviesByGenre(genre) {
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            apikey: OMDB_API_KEY,
            s: genre,
            type: 'movie'
        }
    });
    const movies = response.data.Search;
    if (movies) {
        return movies.filter(movie => movie.Genre && movie.Genre.includes(genre));
    }
    return [];
},

async searchSeriesByGenre(genre) {
    const response = await axios.get(OMDB_BASE_URL, {
        params: {
            apikey: OMDB_API_KEY,
            s: genre,
            type: 'series'
        }
    });
    const series = response.data.Search;
    if (series) {
        return series.filter(serie => serie.Genre && serie.Genre.includes(genre));
    }
    return [];
}


};

export default omdbService;