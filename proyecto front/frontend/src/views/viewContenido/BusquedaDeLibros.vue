<template>
  <div>
    <h1 class="display-4 text-center">TrackNEnjoy</h1>
    <div class="barraDeNavegacion">
      <h4><router-link to="/BusquedaDePeliculasYSeries">Búsqueda de Películas y Series</router-link></h4>
      <h4><router-link to="/ListaDeDeseos">Lista de Deseos</router-link></h4>
      <h3><router-link to="/verPerfil">Mi Perfil</router-link></h3>
    </div>
    <h2>Buscar Libros</h2>
    <input v-model="searchQuery" placeholder="Buscar libros" />
    <button @click="searchBooks">Buscar</button>

    <!-- Mostrar recomendaciones por género si no hay búsqueda activa -->
    <div v-if="!searchQuery">
      <h3>Recomendaciones por Género</h3>
      <div v-for="(books, genre) in recommendedBooks" :key="genre" class="genre-section">
        <h4>{{ genre }}</h4>
        <div class="recomendaciones">
          <div v-for="(book, index) in books" :key="index" @click="selectItem(book)" style="cursor: pointer;">
            <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Portada del libro" />
            <p>{{ book.volumeInfo.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mostrar resultados de búsqueda -->
    <ul v-if="books.length > 0">
      <li v-for="book in books" :key="book.id" @click="selectItem(book)" style="cursor: pointer;">
        <img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Portada del libro" />
        <h3>{{ book.volumeInfo.title }}</h3>
        <p v-if="book.volumeInfo.authors">Autor(es): {{ book.volumeInfo.authors.join(', ') }}</p>
        <p v-if="book.volumeInfo.publishedDate">Año: {{ book.volumeInfo.publishedDate.split('-')[0] }}</p>
        <p>Género: {{ book.Genre }}</p>
      </li>
    </ul>
    <p v-else-if="searchQuery">No se encontraron libros.</p>
  </div>
</template>

<script>
import omdbService from '../../services/omdbService';

export default {
  name: 'BusquedaDeLibros',
  data() {
    return {
      searchQuery: '',
      books: [],
      item: {},
      recommendedBooks: {
        Suspense: [],
        Romance: []
      }
    };
  },
  methods: {
    async searchBooks() {
      try {
        const books = await omdbService.searchBooks(this.searchQuery);
        this.books = books || [];
        if (!this.books.length) {
          console.log('No se encontraron libros.');
        }
      } catch (error) {
        console.error('Error al buscar libros:', error);
      }
    },
    selectItem(book) {
      try {
        this.$router.push({ name: 'DetalleDeLibro', params: { id: book.id } });
      } catch (error) {
        console.error('Error al obtener detalles:', error);
      }
    },
    async fetchRecommendedBooks() {
      try {
        const genres = Object.keys(this.recommendedBooks);
        for (const genre of genres) {
          const books = await omdbService.searchBooksByGenre(genre, 5); // Cambiar si `omdbService` tiene otro método
          this.recommendedBooks[genre] = books || [];
        }
      } catch (error) {
        console.error('Error al cargar recomendaciones:', error);
      }
    }
  },
  mounted() {
    this.fetchRecommendedBooks(); // Cargar recomendaciones al iniciar
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
img {
  margin-right: 10px;
  max-height: 100px;
}
.genre-section {
  margin-bottom: 20px;
}
.recomendaciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.recomendaciones img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}
</style>
