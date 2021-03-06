import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    mode: 'abstract',
    linkActiveClass: 'active',
    routes: routes
});

export default router;