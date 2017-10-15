<template>
    <div class="body-map">
        <div class="main-menu-triangle" @click="back"></div>
        <i class="fa fa-pause main-menu-icon" aria-hidden="true"></i>

        <div class="alert-container">
            <div class="alert alert-primary mb-0" role="alert">
                <strong>Oh no!</strong> This part is not implemented yet.<br />
                Tap the top right corner to go back.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PlayScreen',
        methods: {
            back() {
                this.$router.push({ name: 'MainMenuScreen' });
            }
        }
    };
</script>

<style scoped>
    .main-menu-triangle {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 50px 50px 0;
        border-color: transparent #42bca4 transparent transparent;
        z-index: 1;
    }

    .main-menu-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 2;
        pointer-events: none;
    }

    .alert-container {
        padding: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
</style>