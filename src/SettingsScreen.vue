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
            <p class="lead">{{ userState.name }}</p>
            <router-link :to="{ name: 'SetupNameScreen' }" class="btn btn-light btn-sm">
                <i class="fa fa-fw fa-pencil"></i>
                Change
            </router-link>
        </div>

        <div>
            <h2>
                <i class="fa fa-fw fa-birthday-cake"></i>
                Age
            </h2>
            <p class="lead">{{ userState.age }}</p>
            <router-link :to="{ name: 'SetupAgeScreen' }" class="btn btn-light btn-sm">
                <i class="fa fa-fw fa-pencil"></i>
                Change
            </router-link>
        </div>

        <div>
            <button type="button" class="btn btn-danger btn-lg w-200px" @click="reset">
                <i class="fa fa-fw fa-undo"></i>
                Reset
            </button>
        </div>

        <div>
            <router-link :to="{ name: 'MainMenuScreen' }" class="btn btn-dark btn-lg w-200px">
                <i class="fa fa-fw fa-chevron-left"></i>
                Back
            </router-link>
        </div>
    </div>
</template>

<script>
    import { userStateService } from './states';

    export default {
        name: 'SettingsScreen',
        data() {
            return {
                userState: userStateService.getUserState()
            };
        },
        methods: {
            reset() {
                swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    confirmButtonText: 'Reset'
                }).then(() => {
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