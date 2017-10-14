<template>
    <div class="text-center">
        <img class="img-fluid splash-animation" @animationend="nextScreen" src="assets/images/splash.jpg" @click="skip" />
    </div>
</template>

<script>
    import { userStateService } from './states';
    import storageService from './storageService';

    export default {
        name: 'SplashScreen',
        methods: {
            nextScreen() {
                const name = userStateService.hasNameAndAge() ? 'MainMenuScreen' : 'SetupNameScreen';

                this.$router.push({ name: name });
                storageService.set('splash.skippable', true);
            },
            skip() {
                const isSkippable = storageService.get('splash.skippable');

                if (!isSkippable) {
                    return false;
                }

                this.nextScreen();
            }
        }
    };
</script>

<style>
    .splash-animation {
        opacity: 0;
        animation-duration: 4s;
        animation-name: splash;
        animation-delay: 1s;
    }

    @keyframes splash {
        0%, 100% {
            opacity: 0;
        }

        50% {
            opacity: 1;
        }
    }
</style>