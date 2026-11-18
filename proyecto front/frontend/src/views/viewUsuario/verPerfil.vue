<template>
  <div>
    <h1 class="display-4 text-center">TrackNEnjoy</h1>
    <hr>
    <div class="row">
      <div class="col-12 text-left">
        <h2 class="display-4">Perfil</h2>
      </div>
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body text-center">
            <div class="border-container p-3">
              <h2 class="display-5 mb-4">Información del Perfil</h2>
              <div class="form-group text-left">
                <label class="font-weight-bold d-inline-block">Usuario: </label>
                <input v-if="editMode" v-model="perfil.usuario" type="text" class="form-control d-inline-block w-75" disabled />
                <p v-else class="d-inline-block">{{ perfil.usuario }}</p>
              </div>
              <div class="form-group text-left">
                <label class="font-weight-bold d-inline-block">Nombre: </label>
                <input v-if="editMode" v-model="perfil.nombre" type="text" class="form-control d-inline-block w-75" />
                <p v-else class="d-inline-block">{{ perfil.nombre }}</p>
              </div>
              <div class="form-group text-left">
                <label class="font-weight-bold d-inline-block">Edad: </label>
                <input v-if="editMode" v-model="perfil.edad" type="number" class="form-control d-inline-block w-75" />
                <p v-else class="d-inline-block">{{ perfil.edad }}</p>
              </div>
              <div class="form-group text-left">
                <label class="font-weight-bold d-inline-block">Email: </label>
                <input v-if="editMode" v-model="perfil.email" type="email" class="form-control d-inline-block w-75" />
                <p v-else class="d-inline-block">{{ perfil.email }}</p>
              </div>
              <div class="form-group text-center">
                <button v-if="!editMode" @click="habilitarEdicion" class="btn btn-primary">Editar</button>
                <button v-if="editMode" @click="guardarCambios" class="btn btn-success">Guardar Cambios</button>
                <button v-if="editMode" @click="cancelarEdicion" class="btn btn-danger">Cancelar</button>
                <!-- Botón de Eliminar Perfil -->
                <button @click="confirmarEliminacion" class="btn btn-danger mt-3">Eliminar Perfil</button>
              </div>
            </div>
            <div v-if="mensajeError" class="alert alert-danger mt-4">{{ mensajeError }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="mostrarModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="close" @click="cancelarEliminacion" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar tu perfil?</p>
            <input v-model="contrasena" type="password" class="form-control" placeholder="Ingresa tu contraseña" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelarEliminacion">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="eliminarPerfil">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PerfilUsuario',
  data() {
    return {
      perfil: {
        usuario: '',
        nombre: '',
        edad: '',
        email: ''
      },
      editMode: false,
      mensajeError: '',
      mostrarModal: false,
      contrasena: ''
    };
  },
  created() {
    const nombreDeUsuario = localStorage.getItem('usuario');
    if (nombreDeUsuario) {
      this.obtenerPerfil(nombreDeUsuario);
    } else {
      this.mensajeError = 'Usuario no identificado.';
    }
  },
  methods: {
    obtenerPerfil(usuario) {
      axios.get(`http://localhost:5271/api/controlUsuario/${usuario}`)
        .then(response => {
          this.perfil = response.data;
        })
        .catch(error => {
          this.mensajeError = 'Error al obtener la información del perfil: ' + error.message;
        });
    },
    obtenerContrasena(usuario) {
      return axios.get(`http://localhost:5271/api/controlUsuario/obtenerContrasena/${usuario}`)
        .then(response => {
          return response.data.contrasena;
        })
        .catch(error => {
          this.mensajeError = 'Error al obtener la contraseña: ' + error.message;
          throw error;
        });
    },
    habilitarEdicion() {
      this.editMode = true;
    },
    cancelarEdicion() {
      this.editMode = false;
      this.obtenerPerfil(localStorage.getItem('usuario'));
    },
    async guardarCambios() {
      try {
        const usuario = localStorage.getItem('usuario');
        const contrasena = await this.obtenerContrasena(usuario);

        const perfilModificado = {
          Usuario: this.perfil.usuario,
          Nombre: this.perfil.nombre,
          Edad: this.perfil.edad,
          Email: this.perfil.email,
          Contraseña: contrasena
        };

        axios.put('http://localhost:5271/api/controlUsuario/modificarPerfil', perfilModificado, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          alert(response.data.message);
          this.editMode = false;
        })
        .catch(error => {
          if (error.response && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            this.mensajeError = 'Error al guardar cambios: ' + error.message;
          }
        });
      } catch (error) {
        console.error('Error al obtener la contraseña:', error);
      }
    },
    confirmarEliminacion() {
      this.mostrarModal = true;
    },
    cancelarEliminacion() {
      this.mostrarModal = false;
    },
    eliminarPerfil() {
    const usuario = localStorage.getItem('usuario');
    const contrasenaIngresada = this.contrasena;

    // Validar si la contraseña está vacía
    if (!contrasenaIngresada) {
      alert('Por favor ingresa tu contraseña para confirmar la eliminación.');
      return; // Detiene la ejecución si la contraseña está vacía
    }

    // Verificar si la contraseña ingresada coincide con la del servidor
    this.obtenerContrasena(usuario) // Obtiene la contraseña correcta desde el servidor
      .then(contrasenaCorrecta => {
        if (contrasenaIngresada !== contrasenaCorrecta) {
          alert('La contraseña ingresada no es correcta.');
          return; // Detiene la ejecución si la contraseña no coincide
        }

        // Si la contraseña es válida y coincide, procede con la eliminación
        axios.delete(`http://localhost:5271/api/controlUsuario/eliminarCuenta/${usuario}`, {
          data: { contrasena: contrasenaIngresada }
        })
        .then(response => {
          alert(response.data.message);
          localStorage.removeItem('usuario');
          this.$router.push('/InicioDeSesion');
        })
        .catch(error => {
          alert('Error al eliminar el perfil: ' + error.message);
          this.mostrarModal = false;
        });
      })
      .catch(error => {
        console.error('Error al obtener la contraseña:', error);
        alert('Error al verificar la contraseña: ' + error.message);
      });
  }

  }
};
</script>


