import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h('app'),
    router: router
});