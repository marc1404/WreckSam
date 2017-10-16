<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <strong>Oh no!</strong> <span class="text-danger">Harmful bacteria</span> cells are infecting the body and doing damage to it!
            </p>
            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/bacteria.png" />
            </div>
            <p>
                However, there are not too many of them in the tissue yet, so the body should be fine.
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Okay!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BacteriaModal'
    };
</script>