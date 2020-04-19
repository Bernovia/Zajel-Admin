<template>
  <div>
    <app-header v-if="this.$route.path !== '/login'"></app-header>
    <app-sidebar v-if="this.$route.path !== '/login'"></app-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'admin-lte/dist/js/adminlte.js'
  import './assets/js/all'
  import 'vue-select/dist/vue-select.css';

  import Header from './components/Header';
  import Sidebar from './components/Sidebar';

  export default {
    components: {
      appHeader: Header,
      appSidebar: Sidebar
    }
  }
</script>

<style>
  @import '~admin-lte/dist/css/adminlte.css';
  @import '~admin-lte/dist/css/alt/adminlte.components.css';
  @import '~admin-lte/dist/css/alt/adminlte.core.css';
  @import '~admin-lte/dist/css/alt/adminlte.plugins.css';
  @import '~admin-lte/dist/css/alt/adminlte.pages.css';
  @import '~admin-lte/dist/css/alt/adminlte.extra-components.css';
  @import './assets/css/all.css';
</style>
