<template>
    <div class="row h-100">
        <div class="col-12 col-lg-6 col-xl-4 mx-auto h-100">
            <transition :name="transition" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
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
            this.$router.push({ name: 'SplashScreen' });
        }
    };
</script>

<style>
    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        overflow: hidden;
    }
</style>