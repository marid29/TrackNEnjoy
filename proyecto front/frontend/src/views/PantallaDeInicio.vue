<template>
    <div>
        <div class="barraDeNavegacion">
            <h1>TrackNEnjoy</h1>
            <h4><router-link to="/BusquedaDePeliculasYSeries">Búsqueda de Películas y Series</router-link></h4>     
            <h4><router-link to="/BusquedaDeLibros">Búsqueda de Libros</router-link></h4>             
            <h4><router-link to="/ListaDeDeseos">Lista de Deseos</router-link></h4> 
            <h3><router-link to="/verPerfil">Mi Perfil</router-link></h3>  
        </div>
        <hr>
        <div class="inicio">
            <h3>Recomendaciones de Películas para ti <br></h3>
            <div v-if="peliculas.length" class="contenidoRandom">
                <div v-for="(item, index) in peliculas" :key="index" @click="selectItemPeliculaYSerie(item)" style="cursor: pointer;">
                    <img :src="item.Poster" alt="Poster" v-if="item.Poster !== 'N/A'"/>    
                </div>
            </div>
            <p v-else>Cargando películas...</p>

            <!--<h3>Recomendaciones de Series para ti <br></h3>
            <div v-if="series.length" class="contenidoRandom">
                <div v-for="(item, index) in series" :key="index" @click="selectItemPeliculaYSerie(item)" style="cursor: pointer;">
                    <img :src="item.Poster" alt="Poster" v-if="item.Poster !== 'N/A'"/>               
                </div>
            </div>
            <p v-else>Cargando series...</p>
            <h3>Recomendaciones de Libros para ti <br></h3>-->
            

            <!--
            <p v-else>Cargando libros...</p>
             FUNCION RANDOM DE LIBROS PARA PANTALLA DE INICIO, PERO NO ACTIVA PARA NO GASTAR REQUESTS DE LA API DE LIBROS!!
            <h3>Recomendaciones de Libros para ti <br></h3>
            <div v-if="libros.length" class="contenidoRandom">
                <div v-for="(item, index) in libros" :key="index" @click="selectItemLibro(item)" style="cursor: pointer;">
                    <img v-if="item.volumeInfo && item.volumeInfo.imageLinks" :src="item.volumeInfo.imageLinks.thumbnail" alt="Portada del libro" />
                </div>
            </div> -->
           <!-- <p v-else>Cargando libros...</p> -->
        </div>
    </div>
</template>

<script>
import omdbService from '../services/omdbService';

export default {
    name: 'PantallaDeInicio',
    data() {
        return {
            peliculas: [],
            series: [],
            libros: []
        };
    },
    async created() {
        try {
            this.peliculas = await omdbService.getRandomMovies(10);
            this.series = await omdbService.getRandomSeries(10);
            this.libros = await omdbService.getRandomBooks(10);
        }
        catch (error) {
            console.error('Error al obtener contenido aleatorio:', error.message);
        }
    },
    methods: {
        selectItemPeliculaYSerie(item) {
            try {
                this.$router.push({ name: 'DetalleDePeliculasYSeries', params: { id: item.imdbID } });             
            } catch (error) {
                console.error('Error al obtener detalles:', error);
            }
        },
        selectItemLibro(item) {
            try {
                this.$router.push({ name: 'DetalleDeLibro', params: { id: item.id } });             
            } catch (error) {
                console.error('Error al obtener detalles:', error);
            }
        }
    }
};
</script>

<style scoped>
.contenidoRandom {
    display: flex;
    flex-direction: row;
    margin: 5px;
}
.barraDeNavegacion {
    display: flex;
    flex-direction: row;
    color: #2c3e50;
}
.barraDeNavegacion h1 {
    margin-top: 0;
    margin-right: 60px; 
    margin-bottom: 10px;
    text-align: left;
}
.barraDeNavegacion h3 {
    margin-top: 10px;
    text-align: right;
    margin-left: 500px; 
    margin-bottom: 10px;
}
.barraDeNavegacion h4 {
    margin-top: 10px;
    text-align: left;
    margin-left: 40px; 
}
hr {
    margin-top: 10px;
    border: 1px solid #2c3e50;
}
.inicio {
    display: flex;
    flex-direction: column;
    color: black;
    text-align: left;
}
img {
    width: 100px;
    height: 150px;
    margin-right: 20px; 
}
</style>