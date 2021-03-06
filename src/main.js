import VueResource from 'vue-resource';
import Paginate from 'vuejs-paginate'
import vSelect from 'vue-select'
import App from './App.vue';
import Vue from "vue";
import store from './store'
import router from './router'
import moment from 'moment';
Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.component('paginate', Paginate);
Vue.component('v-select', vSelect);

// Vue.http.options.root = "http://localhost:3000/api/";
// Vue.http.options.root = "https://zajel.mylestone.life/api/";
Vue.http.options.root = "https://api.zajelbook.com/api/";
Vue.http.interceptors.push((request, next) => {
  request.headers.set('access-token', localStorage.accessToken);
  request.headers.set('client', localStorage.client);
  request.headers.set('uid', localStorage.uid);
  request.headers.set('expiry', localStorage.expiry);
  request.headers.set('token-type', localStorage.bearer);

  next(response => {
    if(response.status == 401){
      store.commit('signOut');
      router.push('/login')
    }
  });
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'SignIn' && !store.getters.data.signedIn) next({ name: 'SignIn' })
  else next()
})

new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  render: h => h(App),
})
