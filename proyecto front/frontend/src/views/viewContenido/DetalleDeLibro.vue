<template>
    <div>
        <h2>Detalle del Libro</h2> <!--NUEVO!!!-->
        <div v-if="itemComputed && itemComputed.title">
            <h2>{{ itemComputed.title }}</h2>
            <button @click="guardarEnMiLista">Guardar en mi lista</button>
            <p>{{ itemComputed.publishedDate ? itemComputed.publishedDate.split('-')[0] : itemComputed.Year }} - {{ itemComputed.categories[0].split('/')[0].trim() }}</p> <!--NUEVO!!!-->
            <p v-if="itemComputed.authors">Autor(es): {{ itemComputed.authors.join(', ') }}</p>
            <img :src="itemComputed.imageLinks ? itemComputed.imageLinks.thumbnail : (itemComputed.Poster !== 'N/A' ? itemComputed.Poster : '')" alt="Portada" v-if="itemComputed.imageLinks || itemComputed.Poster !== 'N/A'"/>
            <span v-if="!itemComputed.imageLinks && itemComputed.Poster === 'N/A'">No hay imagen disponible</span>
            <p>{{ itemComputed.description }}</p>
        </div>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 

export default {
    name: 'DetalleDeLibro',
    data() {
        return {
            item: {},
            listaDeDeseos: []
        };
    },
    created() {
        const urlLibro = `https://www.googleapis.com/books/v1/volumes/${this.$route.params.id}`;
        axios.get(urlLibro)
            .then(response => {
                //this.item = response.data.volumeInfo; NUEVO!!!
                const volumeInfo = response.data.volumeInfo;
                const genre = volumeInfo.categories ? volumeInfo.categories.join[0] : 'Desconocido';
                this.item = {
                    ...volumeInfo,
                    Genre: genre
                };
            });

        this.obtenerListaDeDeseos();
    },
    computed: { //NUEVO!!!
        itemComputed() { 
            return this.item;
        }
    },
    methods: {
        obtenerListaDeDeseos() {
            const usuario = localStorage.getItem('usuario');
            if (!usuario) {
                alert('Usuario no identificado');
                return;
            }

            axios.get(`http://localhost:5271/contenido/${usuario}`)
                .then(response => {
                    this.listaDeDeseos = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de deseos:', error);
                });
        },
        guardarEnMiLista() {
            const usuario = localStorage.getItem('usuario');
            if (!usuario) {
                alert('Usuario no identificado');
                return;
            }

            // Mostrar prompt para seleccionar el estado NUEVO!!!
            const estado = prompt("Seleccione el estado:\n1. Leído\n2. Por Leer\n3. Leyendo");
            let estadoSeleccionado;
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

            const contenido = { //NUEVO!!!
                Titulo: this.itemComputed.title,
                Descripcion: this.itemComputed.description,
                FotoPortada: this.itemComputed.imageLinks ? this.itemComputed.imageLinks.thumbnail : '',
                Tipo: 'Libro',
                Autor: this.itemComputed.authors ? this.itemComputed.authors.join(', ') : 'Autor desconocido',
                Estado: estadoSeleccionado //NUEVO!!!
            };

            // Verificar si el contenido ya existe en la lista de deseos
            const contenidoYaExiste = this.listaDeDeseos.some(c => c.Titulo === contenido.Titulo && c.Tipo === contenido.Tipo);
            if (contenidoYaExiste) {
                alert('El contenido ya está en la lista de deseos');
                return;
            }

            axios.post(`http://localhost:5271/api/contenido/guardar/${usuario}`, contenido)
                .then(response => {
                    alert(response.data.message);
                })
                .catch(error => {
                    if (error.response && error.response.data.message) {
                        alert(error.response.data.message);
                    } else {
                        console.error('Error al guardar en la lista de deseos:', error);
                    }
                });
        }
    }
};
</script>