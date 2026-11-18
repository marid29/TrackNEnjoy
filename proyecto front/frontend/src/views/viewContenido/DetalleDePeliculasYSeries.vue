<template>
    <div>
        <h2>Detalle de Contenido</h2>
        <div v-if="item && (item.title || item.Title)">
            <h2>{{ item.title || item.Title }}</h2>
            <button @click="guardarEnMiLista">Guardar en mi lista</button>
            <p>{{ item.publishedDate ? item.publishedDate.split('-')[0] : item.Year }} - {{ item.Type }} - {{ item.Genre }}</p> <!--NUEVO!!!-->
            <img :src="item.imageLinks ? item.imageLinks.thumbnail : (item.Poster !== 'N/A' ? item.Poster : '')" alt="Portada" v-if="item.imageLinks || item.Poster !== 'N/A'"/>
            <span v-if="!item.imageLinks && item.Poster === 'N/A'">No hay imagen disponible</span>
            <p>{{ item.description || item.Plot }}</p>
        </div>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    name: 'DetalleDePeliculasYSeries',
    data() {
        return {
            item: {}
        };
    },
    created() {      
        const url = `https://www.omdbapi.com/?apikey=4d5427c5&i=${this.$route.params.id}&plot=full`;
        axios.get(url)
            .then(response => {
                this.item = response.data;
            });
    },
    methods: {
        guardarEnMiLista() {
            const usuario = localStorage.getItem('usuario'); // Obtener el nombre del usuario de localStorage
            if (!usuario) {
                alert('Usuario no identificado');
                return;
            }
            
            // Mostrar prompt para seleccionar el estado NUEVO!!!
            const estado = prompt("Seleccione el estado:\n1. Visto\n2. Por Ver\n3. Viendo");
            let estadoSeleccionado = '';
            switch(estado) {
                case '1':
                    estadoSeleccionado = 'visto';
                    break;
                case '2':
                    estadoSeleccionado = 'porver';
                    break;
                case '3':
                    estadoSeleccionado = 'viendo';
                    break;
                default:
                    alert('Estado no válido');
                    return;
            }

            const contenido = {
                Titulo: this.item.title || this.item.Title,
                Descripcion: this.item.description || this.item.Plot,
                FotoPortada: this.item.imageLinks ? this.item.imageLinks.thumbnail : this.item.Poster,
                Tipo: this.item.Type,
                Estado: estadoSeleccionado, //NUEVO!!!    
            };

            console.log('Contenido a guardar:', contenido); // Verificar que Estado se está enviando correctamente

            axios.post(`http://localhost:5271/api/contenido/guardar/${usuario}`, contenido)
                .then(response => {
                    alert(response.data.message);
                })
                .catch(error => {
                    if (error.response && error.response.data.message) {
                        alert(error.response.data.message); // Mostrar mensaje de error del servidor
                    } else {
                        console.error('Error al guardar en la lista de deseos:', error);
                    }
                });
        }
    }
};
</script>