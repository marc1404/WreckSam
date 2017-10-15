<template>
    <div>
        <div class="main-menu-triangle" @click="back"></div>
        <i class="fa fa-times main-menu-icon" aria-hidden="true"></i>
    	<Game state="tutorial"></Game>
    </div>
</template>

<script>
	import swal from 'sweetalert2';
    import WreckSam from './game';

    export default {
        name: 'TutorialScreen',
        methods: {
        back() {
        	WreckSam.TutorialState.lockRender=true;
        	console.log(WreckSam)

        	console.log(WreckSam.TutorialState)
                swal({
                    title: 'Back to main menu?',
                    text: 'You will lose all your progress',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Back to main menu'
                }).then(() => {
                    this.$router.push({ name: 'MainMenuScreen' });
                }).catch(() => {});
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
</style>