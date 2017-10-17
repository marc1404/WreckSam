<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <strong>Macrophages</strong> are your first line of defense.
                These large cells <span class="text-success">feast on bacteria cells</span>
            </p>

            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/macrophage.png" />
            </div>

            <p>
                Touch the <strong>Macrophage</strong> inside the <strong>bone marrow</strong> <i>(white area)</i> at the bottom of your screen.
                This will deploy <code>100</code> Macrophage cells each to the tissue.
            </p>
        </div>
        <div class="modal-footer justify-content-between">
            <a href="https://en.wikipedia.org/wiki/Macrophage" rel="noopener" target="_blank" class="btn btn-info">
                <i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>
                More information
            </a>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MacrophageModal'
    };
</script>