<template>
    <div>
        <h1 class="card-title text-center">
            Hi <strong>{{ userState.name }}</strong>!
        </h1>
        <h2 class="card-title text-center" style="margin-bottom: 100px">How old are you?</h2>

        <div class="row">
            <div class="col-6 mx-auto">
                <input type="number" min="1" max="99" step="1" class="form-control form-control-lg text-center" placeholder="Age" v-model="userState.age">
            </div>
        </div>
    </div>
</template>

<script>
    import { userStateService } from '../states';

    export default {
        name: 'SetupAgeScreen',
        data() {
            return {
                userState: userStateService.getUserState()
            };
        }
    };
</script>