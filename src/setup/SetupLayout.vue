<template>
    <div class="d-flex flex-column p-3 h-100">
        <transition :name="transition" mode="out-in">
            <router-view></router-view>
        </transition>

        <div class="mt-auto">
            <button type="button" class="btn btn-primary btn-block btn-lg mb-3" @click="next">Next</button>

            <div class="text-center">
                <i class="fa fa-fw fa-lg fa-circle transition-color" :class="nameCircleClass" @click="toNameScreen"></i>
                <i class="fa fa-fw fa-lg fa-circle transition-color" :class="ageCircleClass" @click="toAgeScreen"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SetupScreen',
        computed: {
            nameCircleClass() {
                return this.$route.name === 'SetupNameScreen' ? 'text-primary' : 'text-secondary';
            },
            ageCircleClass() {
                return this.$route.name === 'SetupAgeScreen' ? 'text-primary' : 'text-secondary';
            },
            transition() {
                return this.$route.name === 'SetupNameScreen' ? 'slide-right' : 'slide-left';
            }
        },
        methods: {
            toNameScreen() {
                this.$router.push({ name: 'SetupNameScreen' });
            },
            toAgeScreen() {
                this.$router.push({ name: 'SetupAgeScreen' });
            },
            next() {
                const name = this.$route.name === 'SetupNameScreen' ? 'SetupAgeScreen' : 'MainMenuScreen';

                this.$router.push({ name: name });
            }
        }
    };
</script>

<style>
    .setup-transition-enter-active, .setup-transition-leave-active {
        transition: transform 1s;
    }

    .setup-transition-enter {
        transform: translateX(100%);
    }

    .setup-transition-enter-to {
        transform: translateX(0);
    }

    .setup-transition-leave {
        transform: translateX(0);
    }

    .setup-transition-leave-to {
        transform: translateX(-100%);
    }
</style>