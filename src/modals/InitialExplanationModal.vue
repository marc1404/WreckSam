<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                This is your <strong>body</strong>.
                You will have to make use of the <strong>immune system</strong> to protect it from sustaining <span class="text-danger">damage</span>.
            </p>

            <div class="text-center">
                <img style="width: 300px" src="assets/sprites/healthbar.png" />
            </div>

            <p>
                The <span class="text-success">health bar</span> at the top of your screen indicates how you are doing.
                Make sure it doesn't drop to <span class="text-danger">zero</span>! <br />
                For now everything seems fine, sit back and relax 🤗
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InitialExplanationModal'
    };
</script>