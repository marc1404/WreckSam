<template>
    <div>
        <h1 class="card-title text-center">Hello!</h1>
        <h2 class="card-title text-center" style="margin-bottom: 100px">What's your name?</h2>

        <div class="row">
            <div class="col-8 mx-auto">
                <input type="text" class="form-control form-control-lg text-center" placeholder="First Name" v-model="userState.name">
            </div>
        </div>
    </div>
</template>

<script>
    import { userStateService } from '../states';

    export default {
        name: 'SetupNameScreen',
        data() {
            return {
                userState: userStateService.getUserState()
            };
        }
    };
</script>