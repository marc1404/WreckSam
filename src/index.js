import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import Game from './Game.vue';

Vue.use(VueRouter);

Vue.component('Game', Game);

new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h('app'),
    router: router
});