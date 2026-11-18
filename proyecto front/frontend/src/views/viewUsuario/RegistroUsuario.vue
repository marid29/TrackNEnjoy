<template>
    <div class="form-box">
        <form class="form" @submit.prevent="registrarUsuario">
            <span class="title">TrackNEnjoy</span>
            <span class="subtitle">Crea tu cuenta</span>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16 2C16 0.895431 16.8954 0 18 0H46C47.1046 0 48 0.895431 48 2V6C48 7.10457 47.1046 8 46 8H44.6667C42.8319 8 41.6667 9.16512 41.6667 11V13C41.6667 13.5304 41.2987 14 40.8284 14H23.1716C22.7013 14 22.3333 13.5304 22.3333 13V11C22.3333 9.16512 21.1681 8 19.3333 8H18C16.8954 8 16 7.10457 16 6V2Z"
                        stroke="black" fill="pink" />
                    <path
                        d="M16 62C16 63.1046 16.8954 64 18 64H46C47.1046 64 48 63.1046 48 62V58C48 56.8954 47.1046 56 46 56H44.6667C42.8319 56 41.6667 54.8349 41.6667 53V51C41.6667 50.4696 41.2987 50 40.8284 50H23.1716C22.7013 50 22.3333 50.4696 22.3333 51V53C22.3333 54.8349 21.1681 56 19.3333 56H18C16.8954 56 16 56.8954 16 58V62Z"
                        stroke="black" fill="pink" />
                    <path
                        d="M32 16C33.1046 16 34 16.8954 34 18V46C34 47.1046 33.1046 48 32 48C30.8954 48 30 47.1046 30 46V18C30 16.8954 30.8954 16 32 16Z"
                        stroke="black" fill="pink" />
                </svg>
                <input autocomplete="off" id="edad" type="number" class="input-field" v-model="edad"
                    @input="validarEdad" placeholder="Edad" />
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M48 4H16C13.8 4 12 5.8 12 8v48c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V8c0-2.2-1.8-4-4-4zm-6 50H22V50c0-3.3 6.7-6 10-6s10 2.7 10 6v4zm4-8h-4c-1-1.9-3.8-4-10-4s-9 2.1-10 4h-4v-4h28v4zm0-8H22v-6h24v6zm0-10H22v-4h24v4zM16 8h32v8H16V8z"
                        stroke="black" fill="pink" />
                </svg>
                <input autocomplete="off" id="nombreDeUsuario" type="text" v-model="nombreDeUsuario"
                    class="input-field" placeholder="Nombre de Usuario" />
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32 32c8.837 0 16-7.163 16-16S40.837 0 32 0 16 7.163 16 16s7.163 16 16 16zm0 8c-8.837 0-16 7.163-16 16v8h32v-8c0-8.837-7.163-16-16-16z"
                        stroke="black" fill="pink">
                    </path>
                </svg>
                <input autocomplete="off" id="nombre" type="text" v-model="nombre" class="input-field"
                    placeholder="Nombre" />
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2 12C2 8.68629 4.68629 6 8 6H56C59.3137 6 62 8.68629 62 12V52C62 55.3137 59.3137 58 56 58H8C4.68629 58 2 55.3137 2 52V12ZM8 12V14.718L32 32.61L56 14.718V12H8ZM56 20.47L32.69 38.412C32.4949 38.5547 32.253 38.6279 32 38.6279C31.747 38.6279 31.5051 38.5547 31.31 38.412L8 20.47V52H56V20.47Z"
                        stroke="black" fill="pink" />
                </svg>

                <input autocomplete="off" id="email" type="email" v-model="email" @input="validarEmail"
                    class="input-field" placeholder="Correo Electrónico">
            </div>
            <div class="field">
                <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
                        stroke="black" fill="pink">
                    </path>
                </svg>
                <input autocomplete="off" id="Contraseña" type="password" v-model="contraseña" class="input-field"
                    placeholder="Contraseña">
            </div>
            <button type="submit" :disabled="!camposValidos">
                <span class="text">Registrarse</span>
                <span class="blob"></span>
                <span class="blob"></span>
                <span class="blob"></span>
                <span class="blob"></span>
            </button>
        </form>
        <div class="form-section">
            <h3 class="mt-3">¿Ya tienes cuenta? <router-link to="/InicioDeSesion" class="text-primary">Iniciar Sesión</router-link></h3>
        </div>
    </div>
    <div>
        <label v-if="mensajeError" class="alert alert-danger text-center">{{ mensajeError }}</label>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    name: 'RegistroUsuario',
    data() {
        return {
            edad: '',
            nombreDeUsuario: '',
            nombre: '',
            email: '',
            contraseña: '',
            mensajeError: '',
            listaUsuarios: []
        };
    },
    computed: {
        camposCompletos() {
            return this.edad && this.nombreDeUsuario && this.nombre && this.email && this.contraseña;
        },
        camposValidos() {
            return this.camposCompletos && this.validarCampos();
        }
    },
    methods: {
        validarEmail() {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!re.test(this.email)) { 
                this.mensajeError = 'Por favor ingrese un correo electrónico válido.'; 
                return false; 
            }
            this.mensajeError = ''; 
            return true; 
        },
        validarCampos() {
            if (!this.camposCompletos) {
                this.mensajeError = 'Todos los campos son obligatorios.';
                return false;
            }
            if (this.nombreDeUsuario.includes(' ')) {
                this.mensajeError = 'El nombre de usuario no debe contener espacios.';
                return false;
            }
            if (this.edad < 0) {
                this.mensajeError = 'La edad no puede ser negativa.';
                return false;
            }
            if (this.edad < 18) {
                this.mensajeError = 'Debes ser mayor de 18 años para registrarte.';
                return false;
            }
            if (this.edad > 99) {
                this.mensajeError = 'La edad no pertenece al rango permitido.';
                return false;
            }
            const usuarioExistente = this.listaUsuarios.find(usuario => usuario.nombreDeUsuario === this.nombreDeUsuario);
            if (usuarioExistente) {
                this.mensajeError = 'El nombre de usuario ya existe. Elige otro.';
                return false;
            }
            this.mensajeError = ''; 
            return true;
        },
        validarEdad() {
            if (this.edad < 0) {
                this.edad = 0;
                this.mensajeError = 'La edad no puede ser negativa.';
            } else {
                this.mensajeError = ''; 
            }
        },
        registrarUsuario() {
            if (!this.validarCampos()) {
                return; 
            }

            const usuario = {
                nombre: this.nombre,
                usuario: this.nombreDeUsuario,
                contraseña: this.contraseña,
                email: this.email,
                edad: this.edad,
            };

            axios.post('http://localhost:5271/api/controlUsuario', [usuario])
                .then(response => {
                    console.log(response.data.message);
                    localStorage.setItem('usuario', this.nombreDeUsuario);
                    this.listaUsuarios.push(usuario);
                    this.edad = '';
                    this.nombreDeUsuario = '';
                    this.nombre = '';
                    this.email = '';
                    this.contraseña = '';
                    this.$router.push('/PantallaDeInicio');
                })
                .catch(error => {
                    this.mensajeError = 'Error al registrar usuario: ' + error.message;
                });
        }
    },
    
};

</script>



<style scoped>
.border-container {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    max-width: 200px;
    margin: 0 auto;
}

.label-right {
    display: block;
    text-align: right;
    margin-bottom: .5rem;
}

.title {
    font-family: Arial, Helvetica, sans-serif;
    color: #f5f5f5;
    display: block;
    font-size: .75em;
}

.form-box {
    max-width: 300px;
    background: #2a2b38;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
    margin-left: 500px;
}

.form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
}

.title {
    margin-bottom: 1rem;
    font-size: 1.5em;
    font-weight: 500;
    color: #f5f5f5;
}

.subtitle {
    font-size: 1rem;
    color: #666;
}

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

.input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: 8px 15px;
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

.field input:focus::placeholder {
    opacity: 0;
    transition: opacity .3s;
}

.form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color .3s ease;
}

.form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
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
    margin-left: 55px;
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

h3 {
    color: #f5f5f5;
    display: block;
    font-size: .75em;
    transition: color .3s ease-out;
}

.text-primary {
    color: #f1c64e;
}

.alert {
    margin-top: 20px;
    color: #ff1b6b;
    font-size: medium;
}
</style> 
