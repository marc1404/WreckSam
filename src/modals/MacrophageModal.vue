<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                <strong>Macrophages</strong> are your first line of defense.
                These large cells <span class="text-success">feast on bacteria cells</span>. <br />
            </p>

            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/macrophage.png" />
            </div>

            <p class="mb-0">
            In order to attack the <span class="text-danger">bacteria</span>, the <strong>body tissue</strong>, represented by the pink area, needs to contain some <span class="text-success">Macrophages</span>.
            </p>
            <p>
            Touch the <strong>Macrophage</strong> in the white area at the bottom of your screen, which is the <strong>bone marrow</strong> in order to deploy 100 Macrophages to the <strong>body tissue.</strong>
            </p>
            <p>
            Touch the <strong>Macrophage</strong> in the <strong>bone marrow</strong> multiple times to deploy 100 Macrophages each time, thus reinforcing your offence. And remember: Offence is always the best defence.
            </p>
        </div>
        <div class="modal-footer justify-content-between">
            <a href="https://en.wikipedia.org/wiki/Macrophage" rel="noopener" target="_blank" class="btn btn-info">
                <i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>
                More information
            </a>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Let's do it!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MacrophageModal'
    };
</script>