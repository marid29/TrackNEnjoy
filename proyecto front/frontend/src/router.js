import { createRouter, createWebHistory } from 'vue-router';
import InicioDeSesion from './views/viewUsuario/InicioDeSesion.vue';
import RegistroUsuario from './views/viewUsuario/RegistroUsuario.vue';
import BusquedaDePeliculasYSeries from './views/viewContenido/BusquedaDePeliculasYSeries.vue';
import BusquedaDeLibros from './views/viewContenido/BusquedaDeLibros.vue';
import ListaDeDeseos from './views/viewContenido/ListaDeDeseos.vue';
import DetalleDePeliculasYSeries from './views/viewContenido/DetalleDePeliculasYSeries.vue';
import DetalleDeLibro from './views/viewContenido/DetalleDeLibro.vue';
import subirFotoDePerfil from './views/viewUsuario/subirFotoDePerfil.vue';
import PantallaDeInicio from './views/PantallaDeInicio.vue';
import verPerfil from './views/viewUsuario/verPerfil.vue';

const routes = [
  { 
    path: '/',
    redirect: '/InicioDeSesion'
  },
  {
    path: '/InicioDeSesion',
    name: 'InicioDeSesion',
    component: InicioDeSesion
  },
  {
    path: '/RegistroUsuario',
    name: 'RegistroUsuario',
    component: RegistroUsuario
  },
  {
    path: '/PantallaDeInicio',
    name: 'PantallaDeInicio',
    component: PantallaDeInicio
  },
  {
    path: '/BusquedaDePeliculasYSeries',
    name: 'BusquedaDePeliculasYSeries',
    component: BusquedaDePeliculasYSeries
  },
  {
    path: '/BusquedaDeLibros',
    name: 'BusquedaDeLibros',
    component: BusquedaDeLibros
  },
  {
    path: '/ListaDeDeseos',
    name: 'ListaDeDeseos',
    component: ListaDeDeseos
  },
  {
    path: '/DetalleDePeliculasYSeries/:id',
    name: 'DetalleDePeliculasYSeries',
    component: DetalleDePeliculasYSeries
  },
  {
    path: '/DetalleDeLibro/:id',
    name: 'DetalleDeLibro',
    component: DetalleDeLibro
  },
  {
    path: '/verPerfil',
    name: 'verPerfil',
    component: verPerfil
  },
  {
    path: '/subirFotoDePerfil',
    name: 'subirFotoDePerfil',
    component: subirFotoDePerfil
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;