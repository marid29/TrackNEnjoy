<template>
    <div>
        <h1 class="display-4 text-center">TrackNEnjoy</h1>
        <div class="barraDeNavegacion">
            <h4><router-link to="/BusquedaDeLibros">Búsqueda de Libros</router-link></h4>
            <h4><router-link to="/ListaDeDeseos">Lista de Deseos</router-link></h4>
            <h3><router-link to="/verPerfil">Mi Perfil</router-link></h3>
        </div>

        <h2>Buscar Películas y Series</h2>
        <input v-model="query" placeholder="Ingresa el título de la película o serie"/>
        <button @click="searchContent">Buscar</button>

        <h3>Resultados</h3>
        <ul v-if="results.length">
            <li v-for="result in results" :key="result.imdbID" @click="selectItem(result)" style="cursor: pointer;">
                <img :src="result.Poster" alt="Poster" v-if="result.Poster !== 'N/A'"/>
                <span v-if="result.Poster === 'N/A'">No hay imagen disponible</span>
                {{ result.Title }} ({{ result.Year }}) - {{ result.Type }} - {{ result.Genre }} <!--NUEVO!!!-->
            </li>
        </ul>
        <p v-else>No se encontraron resultados</p>

        <!-- Recomendaciones de Películas y Series por Género -->
        <h3>Recomendaciones de Películas</h3>
        <h4>Comedia</h4>
        <div v-if="recommendedMovies.Comedy.length">
            <div v-for="(movie, index) in recommendedMovies.Comedy" :key="index" @click="selectItem(movie)" style="cursor: pointer;">
                <img :src="movie.Poster" alt="Poster" v-if="movie.Poster !== 'N/A'"/>
                <h5>{{ movie.Title }}</h5>
            </div>
        </div>
        <p v-else>Cargando películas de comedia...</p>

        <h4>Drama</h4>
        <div v-if="recommendedMovies.Drama.length">
            <div v-for="(movie, index) in recommendedMovies.Drama" :key="index" @click="selectItem(movie)" style="cursor: pointer;">
                <img :src="movie.Poster" alt="Poster" v-if="movie.Poster !== 'N/A'"/>
                <h5>{{ movie.Title }}</h5>
            </div>
        </div>
        <p v-else>Cargando películas de drama...</p>

        
    </div>
</template>

<script>
import omdbService from '../../services/omdbService';

export default {
    name: 'BusquedaDePeliculasYSeries',
    data() {
        return {
            query: '',
            results: [],
            recommendedMovies: {
                Comedy: [],
                Drama: []
            },
            recommendedSeries: {
                Comedy: [],
                Drama: []
            },
            item: {}
        };
    },
    methods: {
        async searchContent() {
            const movies = await omdbService.searchMovies(this.query);
            const series = await omdbService.searchSeries(this.query);
            this.results = [...(movies || []), ...(series || [])];
        },
        async fetchRecommendedMovies() {
            const comedyMovies = await omdbService.searchMoviesByGenre('Comedy');
            const dramaMovies = await omdbService.searchMoviesByGenre('Drama');
            this.recommendedMovies.Comedy = comedyMovies;
            this.recommendedMovies.Drama = dramaMovies;
        },
        async fetchRecommendedSeries() {
            const comedySeries = await omdbService.searchSeriesByGenre('Comedy');
            const dramaSeries = await omdbService.searchSeriesByGenre('Drama');
            this.recommendedSeries.Comedy = comedySeries;
            this.recommendedSeries.Drama = dramaSeries;
        },
        selectItem(result) {
            try {
                this.$router.push({ name: 'DetalleDePeliculasYSeries', params: { id: result.imdbID } });             
            } catch (error) {
                console.error('Error al obtener detalles:', error);
            }
        }
    },
    mounted() {
        this.fetchRecommendedMovies();
        this.fetchRecommendedSeries();
    }
};
</script>

<style scoped>
    h2, h3, h4 {
        color: #2c3e50;
    }
    input {
        margin-right: 10px;
    }
    button {
        margin: 5px;
    }
    ul {
        list-style-type: none; /*quita los puntos de la lista*/
        padding: 0;
    }
    li {
        margin: 10px 0;
        background: #f9f9f9;
        padding: 10px;
        border: 1px solid #ddd;
    }
    img {
        margin-right: 10px;
        width: 100px;
        height: auto;
    }
    span {
        margin-right: 10px;
        font-style: italic;
        color: #aaa;
    }
</style>
