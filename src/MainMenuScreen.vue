<template>
    <div class="p-3 h-100 d-flex flex-column justify-content-around text-center">
        <img src="assets/images/logo.jpg" class="img-fluid infinite-pulse" />

        <div>
            <router-link :to="{ name: 'PlayScreen' }" class="btn btn-danger btn-lg">
                <i class="fa fa-fw fa-heartbeat"></i>
                Play
            </router-link>
        </div>

        <div>
            <router-link :to="{ name: 'TutorialScreen' }" class="btn btn-dark btn-lg">
                <i class="fa fa-fw fa-graduation-cap"></i>
                Tutorial
            </router-link>
        </div>

        <div>
            <router-link :to="{ name: 'SettingsScreen' }" class="btn btn-dark btn-lg">
                <i class="fa fa-fw fa-wrench"></i>
                Settings
            </router-link>
        </div>

        <div>
            <router-link :to="{ name: 'CreditsScreen' }" class="btn btn-dark btn-lg">
                <i class="fa fa-fw fa-file-o"></i>
                Credits
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainMenuScreen'
    };
</script>

<style scoped>
    a.btn {
        width: 200px;
    }

    i.fa {
        margin-right: 5px;
    }
</style>