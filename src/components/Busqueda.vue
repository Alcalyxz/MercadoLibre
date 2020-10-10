<template>
  <div class="column is-12-mobile is-4-desktop is-4-tablet">
    <div class="card">
      <div class="card-header">
        <img v-bind:src="busqueda.thumbnail" v-bind:alt="busqueda.tittle">
      </div>
      <div class="card-content">
        <h3 class="title is-size-4">{{busqueda.title}}</h3>
        <h3 class="title is-size-4">{{busqueda.price}}</h3>
        <button class="button is-success is-rounded is-small" @click="showMore(busqueda.id)">Ver mas</button>
      </div>
    </div>
  </div>
</template>

//Props son variables que eprmiten al componente recibir datos del pare (app enviara datos a busqueda)
<script>
export default {
  props: ["busqueda"],
  methods: {
    showMore(id) {
      this.$emit("showModal", id);
    }
  }
};
</script>
