<template>
    <div>
        <h1 class="display-4 text-center">TrackNEnjoy</h1>
        <h3 class="perfil-link"><router-link to="/verPerfil">Mi Perfil</router-link></h3>
        <hr>
        <h2 class="display-5 text-left">Tu Lista de Deseos</h2>

        <div class="text-center mb-4">
            <button @click="irABusquedaDePeliculasYSeries" class="btn btn-primary mr-2">Agregar Películas y Series</button>
            <button @click="irABusquedaDeLibro" class="btn btn-secondary">Agregar Libros</button>
        </div>

        <div>
            <h3>Películas y Series</h3>
            
            <h4>Visto</h4>
            <div v-if="pelisYSeriesVisto.length === 0">
                <p>No hay contenido en la categoría "Visto".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in pelisYSeriesVisto" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                            <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4>Por Ver</h4>
            <div v-if="pelisYSeriesPorVer.length === 0">
                <p>No hay contenido en la categoría "Por Ver".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in pelisYSeriesPorVer" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                            <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger mt-2">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning mt-2">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4>Viendo</h4>
            <div v-if="pelisYSeriesViendo.length === 0">
                <p>No hay contenido en la categoría "Viendo".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in pelisYSeriesViendo" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                           <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger mt-2">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning mt-2">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3>Libros</h3>
            
            <h4>Leído</h4>
            <div v-if="librosLeido.length === 0">
                <p>No hay contenido en la categoría "Leído".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in librosLeido" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                            <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger mt-2">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning mt-2">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4>Por Leer</h4>
            <div v-if="librosPorLeer.length === 0">
                <p>No hay contenido en la categoría "Por Leer".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in librosPorLeer" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                           <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger mt-2">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning mt-2">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h4>Leyendo</h4>
            <div v-if="librosLeyendo.length === 0">
                <p>No hay contenido en la categoría "Leyendo".</p>
            </div>
            <div v-else class="row">
                <div v-for="contenido in librosLeyendo" :key="contenido.titulo" class="col-md-6 mb-4">
                    <div class="contenido-card" @click="toggleDescripcion(contenido.titulo)">
                        <img :src="contenido.fotoPortada" alt="Portada" class="contenido-imagen" v-if="contenido.fotoPortada"/>
                        <div class="contenido-info">
                            <strong class="contenido-titulo">{{ contenido.titulo }}</strong><br>
                            <span class="contenido-tipo">{{ contenido.tipo }}</span>
                            <span v-if="descripcionVisible === contenido.titulo" class="contenido-descripcion">{{ contenido.descripcion }}</span>
                            <div class="button-group mt-2">
                                <button id="bt-eliminar" @click.stop="eliminarContenido(contenido.titulo)" class="btn btn-danger mt-2">Eliminar</button>
                                <button id="bt-modificar" @click.stop="modificarContenido(contenido.tipo, contenido.titulo)" class="btn btn-warning mt-2">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ListaDeDeseos',
    data() {
        return {
            listaDeDeseos: [], //lista completa de deseos
            descripcionVisible: null, //para rastrear cuál descripción está visible

            //listas separadas para mostrar el contenido por cada enum
            pelisYSeriesVisto: [],
            pelisYSeriesPorVer: [],
            pelisYSeriesViendo: [],
            librosLeido: [],
            librosPorLeer: [],
            librosLeyendo: [],
            usuario: null
        };
    },
    created() {
        this.obtenerUsuario();
        this.obtenerListaDeDeseos();
    },
    methods: {
        async obtenerUsuario() {
        try {
            // Simulamos la recuperación del usuario del localStorage
            const usuarioGuardado = await Promise.resolve(localStorage.getItem('usuario'));

            if (usuarioGuardado) {
                this.usuario = usuarioGuardado; // Asignar el usuario al componente
            } else {
                alert('Usuario no identificado. Por favor, inicie sesión.');
                // Opcional: redirigir a la página de inicio de sesión
                // this.$router.push('/login');
                return null;
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    },
        async obtenerListaDeDeseos() {
            const usuario = localStorage.getItem('usuario'); // Obtener el nombre del usuario de localStorage
            if (!usuario) {
                alert('Usuario no identificado');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5271/api/contenido/${usuario}`); // Dirección del servidor
                this.listaDeDeseos = response.data; // Asignar la lista de deseos al componente
                this.categorizarContenido(); // Llamar a la función para categorizar el contenido
            } catch (error) {
                console.error('Error al obtener la lista de deseos:', error);
            }
        },
        
        categorizarContenido() {
            //limpiar las listas
            this.pelisYSeriesVisto = [];
            this.pelisYSeriesPorVer = [];
            this.pelisYSeriesViendo = [];
            this.librosLeido = [];
            this.librosPorLeer = [];
            this.librosLeyendo = [];

            //categorizar cada contenido
            this.listaDeDeseos.forEach(contenido => {
                switch (contenido.tipo) {
                    case 'movie':
                    case 'series':
                        switch (contenido.estado) {
                            case 'visto':
                                this.pelisYSeriesVisto.push(contenido);
                                break;
                            case 'porver':
                                this.pelisYSeriesPorVer.push(contenido);
                                break;
                            case 'viendo':
                                this.pelisYSeriesViendo.push(contenido);
                                break;
                            default:
                                console.log('Estado no categorizado - PeliculasSeries:', contenido.estado);
                                break;
                        }
                        break;

                    case 'Libro':
                        switch (contenido.estado) {
                            case 'visto':
                                this.librosLeido.push(contenido);
                                break;
                            case 'porver':
                                this.librosPorLeer.push(contenido);
                                break;
                            case 'viendo':
                                this.librosLeyendo.push(contenido);
                                break;
                            default:
                                console.log('Estado no categorizado - Libros:', contenido.estado);
                                break;
                        }
                        break;

                    default:
                        console.log('Tipo no categorizado:', contenido.tipo);
                        break;
                }
            });

        },
        toggleDescripcion(titulo) {
            // Alterna la visibilidad de la descripción
            this.descripcionVisible = (this.descripcionVisible === titulo) ? null : titulo;
        },
        irABusquedaDePeliculasYSeries() {
            this.$router.push('/BusquedaDePeliculasYSeries');
        },
        irABusquedaDeLibro() {
            this.$router.push('/BusquedaDeLibros');
        },
        async eliminarContenido(titulo) {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        alert('Usuario no identificado');
        return;
    }

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este contenido?');
    if (!confirmacion) {
        return;
    }

    try {
        await axios.delete(`http://localhost:5271/api/contenido/eliminar/${usuario}/${titulo}`);
        alert('Contenido eliminado de la lista de deseos');
        this.obtenerListaDeDeseos(); //actualiza la lista de deseos después de la eliminación
    } catch (error) {
        console.error('Error al eliminar el contenido:', error);
    }
},

        async modificarContenido(tipo, titulo) {
            let estado = '';
            if (tipo === 'movie' || tipo === 'series') {
                estado = prompt("Seleccione el estado:\n1. Visto\n2. Por Ver\n3. Viendo");
            } else if (tipo === 'Libro') {
                estado = prompt("Seleccione el estado:\n1. Leído\n2. Por Leer\n3. Leyendo");
            } else {
                alert('Tipo de contenido no válido');
                return;
            }     
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
            const usuario = localStorage.getItem('usuario');
            if (!usuario) {
                alert('Usuario no identificado');
                return;
            }
            try {
                await axios.put(`http://localhost:5271/api/contenido/actualizar/${usuario}/${titulo}`, { estado: estadoSeleccionado });
                alert('Estado del contenido actualizado');
                this.obtenerListaDeDeseos(); //actualiza la lista de deseos después de la modificación
            } catch (error) {
                console.error('Error al modificar el contenido:', error);
                alert('Error al modificar el contenido. Por favor, inténtalo de nuevo.');
            }
        }
    }
};
</script>

<style scoped>
.listaDeContenidoDelUsuario {
    display: flex;
    flex-direction: column;
    color: black;
    text-align: left;
}
.perfil-link { 
    margin-left: auto; 
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
    box-sizing: border-box;
}

.contenido-card {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
    cursor: pointer; /* Cambia el cursor para indicar que se puede hacer clic */
    flex-direction: row; /*NUEVO!*/
}

.contenido-imagen {
    width: 100px;
    height: auto;
    margin-right: 15px;
}

.contenido-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /*NUEVO!*/
}

.contenido-titulo {
    font-size: 1.2rem;
    font-weight: bold;
}

.contenido-descripcion {
    font-size: 0.9rem;
    color: #555;
}

/*NUEVO!*/
.contenido-tipo, .contenido-estado {
    font-size: 0.8rem;
    color: #888;
}

.text-center .btn {
    margin-bottom: 10px;
}

/*NUEVO!*/
#bt-eliminar, #bt-modificar {
    width: 80px;
    height: 20px;
    margin: 5px;
    text-align: center;
}

.button-group {
    display: flex;
    align-items: center;
}
</style>