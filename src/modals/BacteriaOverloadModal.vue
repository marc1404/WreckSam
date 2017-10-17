<template>
    <div class="modal-content">
        <div class="modal-body">
            <p>
                <span class="text-danger">Bacteria cells are reproducing very fast!</span> <br />
                You have to take action and <strong>eliminate</strong> these cells.
            </p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">What can I do?</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BacteriaOverloadModal'
    };
</script>