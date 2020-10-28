import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading,{
    color: '#333333',
    loader : 'bars',
    width: 64,
    height: 64,
  });