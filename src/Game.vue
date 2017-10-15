<template>
    <div id="game" class="w-100 h-100">
        <div class="main-menu-triangle" @click="back"></div>
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
        methods:{
         back() {
            this.game.pause();
            var that = this;
                swal({
                    title: 'Pause',
                    text: 'Going back to the menu will cause lost progress.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Back to main menu',
                    cancelButtonText: 'Back to the game'
                }).then(() => {
                    this.$router.push({ name: 'MainMenuScreen' });
                },(dismiss) => {
                        that.game.unpause();                       
                }).catch(() => {});
            }
        }
    }
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
</style>