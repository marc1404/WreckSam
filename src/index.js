import 'babel-polyfill';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import Game from './Game.vue';

if (process.env.NODE_ENV === 'production') {
    Raven
        .config('https://63f778bcaa9545749f8187b7dde759f6@sentry.io/228420')
        .addPlugin(RavenVue, Vue)
        .install();
}

Raven.context(bootstrap);

function bootstrap() {
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
}