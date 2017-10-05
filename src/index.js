import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [

    ]
});

Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h('router-view'),
    router: router
});