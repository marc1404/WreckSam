<template>
    <div class="h-100 p-3 d-flex flex-column justify-content-around text-center">
        <h1>
            <i class="fa fa-fw fa-wrench"></i>
            Settings
        </h1>
        
        <div>
            <h2>
                <i class="fa fa-fw fa-user-md"></i>
                Name
            </h2>
            <div class="row">
                <div class="col-6 mx-auto">
                    <input type="text" class="form-control text-center" v-model="name">
                </div>
            </div>
        </div>

        <div>
            <h2>
                <i class="fa fa-fw fa-birthday-cake"></i>
                Age
            </h2>
            <div class="row">
                <div class="col-6 mx-auto">
                    <input type="number" min="1" step="1" max="99" class="form-control text-center" v-model="age">
                </div>
            </div>
        </div>

        <div>
            <button type="button" class="btn btn-danger btn-lg w-200px" @click="reset">
                <i class="fa fa-fw fa-undo"></i>
                Reset
            </button>
        </div>

        <div>
            <router-link :to="{ name: 'MainMenuScreen' }" class="btn btn-dark btn-lg w-200px" @click.native="saveAndBack">
                <i class="fa fa-fw fa-chevron-left"></i>
                Save &amp; Back
            </router-link>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert2';
    import { userStateService } from './states';

    const userState = userStateService.getUserState();

    export default {
        name: 'SettingsScreen',
        data() {
            return {
                name: userState.name,
                age: userState.age
            };
        },
        methods: {
            saveAndBack() {
                const { name, age} = this;

                if (name) {
                    userState.name = name;
                }

                if (age) {
                    userState.age = age;
                }

                userStateService.save();
            },
            reset() {
                swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Reset'
                }).then(() => {
                    userStateService.reset();
                    this.$router.push({ name: 'SplashScreen' });
                }).catch(() => {});
            }
        }
    };
</script>

<style scoped>
    .w-200px {
        width: 200px;
    }
</style>