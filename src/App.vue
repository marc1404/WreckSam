<template>
    <div class="row h-100 m-0 overflow-hidden">
        <div class="col-12 col-lg-6 col-xl-3 mx-auto h-100 p-0 overflow-hidden">
            <transition :name="transition" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <Modal />
    </div>
</template>

<script>
    import storageService from './storageService';

    export default {
        name: 'App',
        data() {
            return {
                transition: 'slide-left'
            };
        },
        watch: {
            $route(to, from) {
                this.transition = to.meta.order > from.meta.order ? 'slide-left' : 'slide-right';
            }
        },
        created() {
            const startScreen = storageService.get('StartScreen') || 'SplashScreen';

            this.$router.push({ name: startScreen });
        }
    };
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
    }

    body, .overflow-hidden {
        overflow: hidden;
    }
</style>