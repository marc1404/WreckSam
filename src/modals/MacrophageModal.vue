<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <strong>Macrophages</strong> are your first line of defense.
                These large cells feast on bacteria cells. <br />
            </p>

            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/macrophage.png" />
            </div>

            <p class="mb-0">
                Touch the <strong>Macrophage</strong> in the <strong>bone marrow</strong> (white area at the bottom of your screen).
                This will add it to the <strong>tissue</strong> (pink upper area of your screen).
            </p>
        </div>
        <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
            <a href="https://en.wikipedia.org/wiki/Macrophage" rel="noopener" target="_blank" class="btn btn-info">
                <i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>
                More information
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MacrophageModal'
    };
</script>