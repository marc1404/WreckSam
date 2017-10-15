<template>
    <div class="body-map">
        <div class="main-menu-triangle" @click="back"></div>
        <i class="fa fa-times main-menu-icon" aria-hidden="true"></i>

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
    .alert-container {
        padding: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
</style>