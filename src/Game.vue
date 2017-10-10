<template>
    <div id="game"></div>
</template>

<script>
    import WreckSam from './game';

    export default {
        name: 'Game',
        props: {
            state: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.game = new WreckSam();

            this.game.start(this.state);
        },
        beforeDestroy() {
            this.game.destroy();
        }
    }
</script>