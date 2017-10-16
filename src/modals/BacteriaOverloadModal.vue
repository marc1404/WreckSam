<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <span class="text-danger">The bacteria are duplicating very quickly!</span>
            </p>
            <p>
                You will have to do something in order to <span class="text-success">defeat</span> these <span class="text-danger">dangerous creatures.</span>
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">I will! ...but what can I do?</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BacteriaOverloadModal'
    };
</script>