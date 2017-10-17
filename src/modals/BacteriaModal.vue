<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <strong>Oh no!</strong> <span class="text-danger">Harmful bacteria</span> cells are infecting the body!
            </p>

            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/bacteria.png" />
            </div>

            <p>
                However, there are not too many of them inside the tissue <i>(pink area)</i> yet.
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BacteriaModal'
    };
</script>