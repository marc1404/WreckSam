<template>
    <div id="game" class="w-100 h-100">
        <div class="main-menu-triangle" @click="pause"></div>
        <i class="fa fa-pause main-menu-icon" aria-hidden="true"></i>
    </div>
</template>

<script>
    import WreckSam from './game';
    import swal from 'sweetalert2';

    export default {
        name: 'Game',
        props: {
            state: {
                type: String,
                required: true
            }
        },
        mounted() {
            document.body.style.backgroundColor = 'black';
            this.game = new WreckSam();

            this.game.start(this.state);
        },
        beforeDestroy() {
            document.body.style.backgroundColor = 'white';

            this.game.destroy();
        },
        methods: {
            pause() {
                this.game.pause();

                swal({
                    title: 'Pause',
                    text: 'Going back to the menu will cause lost progress.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Back to main menu',
                    cancelButtonText: 'Back to the game'
                }).then(() => {
                    this.$router.push({name: 'MainMenuScreen'});
                }).catch(() => {
                    this.game.unpause();
                });
            }
        }
    }
</script>