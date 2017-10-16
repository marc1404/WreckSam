<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                This is your <span class="text-success">body</span>. You will have to take good care of it, otherwise it might get <span class="text-danger">damaged!</span>
            </p>
            <br />
            <p>
                The <span class="text-success"> health bar</span> in the top of the screen represents the amount of <span class="text-succes">health</span> the body has left. Make sure it doesn't <span class="text-danger">drop to 0%!</span>
            </p>
            <div class="text-center">
                <img style="width: 300px" src="assets/sprites/healthbar.png" />
            </div>
            <p>
            For now everything looks fine! Just sit back and relax...
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InitialExplanation'
    };
</script>