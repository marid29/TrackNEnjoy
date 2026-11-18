<template>
    <div class="card">
        <h4 class="title">TrackNEnjoy</h4>
        <form @submit.prevent="iniciarSesion">
            <div class="field">
                <svg class="input-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32 32c8.837 0 16-7.163 16-16S40.837 0 32 0 16 7.163 16 16s7.163 16 16 16zm0 8c-8.837 0-16 7.163-16 16v8h32v-8c0-8.837-7.163-16-16-16z"
                        stroke="black" fill="pink">
                    </path>
                </svg>
                <input autocomplete="off" id="nombreDeUsuario" placeholder="Nombre de Usuario" v-model="nombreDeUsuario"
                    class="input-field" name="logemail" type="text">
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
                        stroke="black" fill="pink">
                    </path>
                </svg>
                <input autocomplete="off" id="Contraseña" placeholder="Contraseña" v-model="contraseña" class="input-field"
                    name="logpass" type="password">
            </div>
            <button type="submit" :disabled="!camposValidos">
                <span class="text">Iniciar Sesión</span>
                <span class="blob"></span>
                <span class="blob"></span>
                <span class="blob"></span>
                <span class="blob"></span>
            </button>
        </form>
        <h3 class="mt-3">¿No tienes cuenta? <router-link to="/RegistroUsuario" class="text-primary">Regístrate
                aquí</router-link></h3>
    </div>
    <div>
        <label v-if="mensajeError" class="alert alert-danger text-center">{{ mensajeError }}</label>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'InicioDeSesion',
    data() {
        return {
            contraseña: '',
            nombreDeUsuario: '',
            listaUsuarios: [],
            mensajeError: ''
        }
    },
    computed: {
        camposCompletos() {
            return this.contraseña && this.nombreDeUsuario;
        },
        camposValidos() {
            return this.camposCompletos && this.validarCampos();
        }
    },
    methods: {
        validarCampos() {
            if (!this.camposCompletos) {
                this.mensajeError = 'Todos los campos son obligatorios.';
                return false;
            }
            if (this.nombreDeUsuario.includes(' ')) {
                this.mensajeError = 'El nombre de usuario no debe contener espacios.';
                return false;
            }
            this.mensajeError = ''; // Limpiar mensaje de error si todo está bien
            return true;
        },
        iniciarSesion() {
            if (!this.validarCampos()) {
                return; // Salir si hay errores
            }

            const credenciales = {
                Usuario: this.nombreDeUsuario,
                Contraseña: this.contraseña
            };

            axios.post('http://localhost:5271/api/controlUsuario/login', credenciales)
                .then(response => {
                    console.log(response.data.message);
                    localStorage.setItem('usuario', this.nombreDeUsuario);
                    this.$router.push('/PantallaDeInicio');
                })
                .catch(error => { 
                    if (error.response && error.response.status === 401) { 
                        this.mensajeError = 'Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'; 
                    } else { 
                        this.mensajeError = 'Error al iniciar sesión: ' + (error.response ? error.response.data.message : error.message); 
                    } 
                });
        }
    },
    mounted() {
        // Cargar la lista de usuarios al montar el componente
        axios.get('http://localhost:5271/api/controlUsuario')
            .then(response => {
                this.listaUsuarios = response.data;
            })
            .catch(error => {
                console.error('Error al cargar usuarios:', error.message);
            });
    }
}
</script>


<style scoped>
.card {
    width: 200px;
    padding: 1.9rem 1.2rem;
    text-align: center;
    background: #2a2b38;
    margin-left: 510px;
    border-radius: 15px;
}

/*Inputs*/
.field {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
    background-color: #1f2029;
    border-radius: 4px;
    padding: .5em 1em;
}

.input-icon {
    height: 1em;
    width: 1em;
    fill: #ffeba7;
}

.input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
}

/*Text*/
.title {
    margin-bottom: 1rem;
    font-size: 1.5em;
    font-weight: 500;
    color: #f5f5f5;
}

/*Hover & focus*/
.field input:focus::placeholder {
    opacity: 0;
    transition: opacity .3s;
}

.btn:hover {
    background-color: #5e6681;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgb(16 39 112 / 20%);
}

.border-container {
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
}

h1,
h2 {
    font-family: 'Arial', sans-serif;
}

h3 {
    color: #f5f5f5;
    display: block;
    font-size: .75em;
    transition: color .3s ease-out;
}

button {
    position: relative;
    font-family: inherit;
    font-size: 18px;
    border-radius: 40em;
    width: 8em;
    height: 3em;
    z-index: 1;
    color: white;
    cursor: pointer;
    overflow: hidden;
    border: none;
    margin-top: 5px;
}

button .text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 3em;
    border-radius: 40em;
    border: none;
    background: linear-gradient(rgba(255, 255, 255, 0.473),
            rgba(150, 150, 150, 0.25));
    z-index: 1;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

button .blob {
    position: absolute;
    z-index: -1;
    border-radius: 5em;
    width: 5em;
    height: 3em;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
}

button .blob:nth-child(2) {
    left: 0em;
    top: 0;
    background: #ff930f;
}

button .blob:nth-child(3) {
    left: 1.8em;
    top: 0;
    z-index: -1;
    background: #bf0fff;
}

button .blob:nth-child(4) {
    left: 4em;
    top: -1em;
    background: #ff1b6b;
}

button .blob:nth-child(5) {
    left: 4.3em;
    top: 1.6em;
    background: #0061ff;
}

button:hover .blob:nth-child(2) {
    background: #0061ff;
}

button:hover .blob:nth-child(3) {
    background: #ff1b6b;
}

button:hover .blob:nth-child(4) {
    background: #bf0fff;
}

button:hover .blob:nth-child(5) {
    background: #ff930f;
}

button:hover .blob {
    transform: scale(1.3);
}

button:active {
    border: 2px solid white;
}

.text-primary {
    color: #007bff;
}

.alert {
    margin-top: 20px;
}
</style>