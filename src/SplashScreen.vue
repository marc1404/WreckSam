<template>
    <div class="text-center">
        <img class="img-fluid splash-animation" @animationend="nextScreen" src="/assets/images/splash.jpg" />
    </div>
</template>

<script>
    export default {
        name: 'SplashScreen',
        methods: {
            nextScreen() {
                this.$router.push({ name: 'SetupName' });
            }
        }
    };
</script>

<style>
    .splash-animation {
        opacity: 0;
        animation-duration: 3s;
        animation-name: splash;
    }

    @keyframes splash {
        0%, 100% {
            opacity: 0;
        }

        45%, 55% {
            opacity: 1;
        }
    }
</style>