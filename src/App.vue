<template>
  <div id="app">
    <div class="hero is-white is-gradient is-bold">
      <div class="hero-body">
        <h1 class="title">
          <span class="has-text-success">Mercado No tan Libre</span>
          <span class="subtitle">BYJuanPabloPosada</span>
        </h1>
        <!--<input type="submit" value="buscador" class="button is-success is-rounded" v-on:click="fetch">-->
        <input type="text" v-model="q" placeholder="Search products">
        <br>
        <br>
        <button class="button is-success is-rounded" v-on:click="fetch">Buscar</button>
      </div>
    </div>

    <div class="container">
      <div class="columns is-desktop is-mobile is-tablet is-multiline is-centered">
        <busqueda
          @showModal="showModal"
          v-for="busqueda of busquedas"
          v-bind:key="busqueda.id"
          v-bind:busqueda="busqueda"
        />
      </div>

      <nav class="pagination" role="navegation" aria-label="pagination">
        <a class="pagination-previous" v-on:click="changePage(offset-50)">Anterior</a>
        <ul class="pagination-list">
          <a class="pagination-link is-current">{{offset}}</a>
        </ul>
        <a class="pagination-next" v-on:click="changePage(offset+50)">Siguiente</a>
      </nav>
    </div>
  </div>
</template>

<script>
//Librerias
import axios from "axios";

import Busqueda from "./components/Busqueda";

//Objeto de Aplicación
export default {
  components: {
    Busqueda //busqueda
  },
  name: "App",
  data: function() {
    return {
      busquedas: [],
      q: "",
      offset: 0,
      offsets: 1
    };
  },
  //Funcion de Vue que nos indica cuando un componente ha sido montado en la aplicación
  create() {
    this.fetch();
  },
  methods: {
    fetch() {
      const params = {
        //Parametros para consultar la API
        offset: this.offset,
        q: this.q
      };
      let result = axios
        .get("https://api.mercadolibre.com/sites/MCO/search?q=", { params })
        .then(res => {
          //Capturamos los datos del appi y los llevamos a
          //La variable busquedas (solo el vector results que tiene 50 size)
          this.busquedas = res.data.results;
          this.offsets = res.data.paging.total;

          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(offset) {
      this.offset = offset < 0 || offset > this.offsets ? this.offset : offset;
      this.fetch();
    },
    showModal(id) {}
  }
};
</script>
