<template>
    <div class="modal-content">
        <div class="modal-body">
            <p class="mb-0">
                Bacteria growth has been slowed down but they are <span class="text-danger">still doing damage</span>!
                Heavier forces are necessary to fight the bacteria cells.
            </p>

            <div class="text-center">
                <img style="width: 200px" src="assets/sprites/neutrophil.png" />
            </div>

            <p class="mb-0">
                <strong>Neutrophils</strong> are much <span class="text-success">more efficient at killing bacteria</span>.
                However, the <span class="text-danger">toxins</span> they release also <span class="text-danger">kill healthy human cells</span>. <br />
                <span class="text-danger">Carefully</span> deploy some <strong>Neutrophils</strong> to fight back against the bacteria threat.
            </p>
        </div>
        <div class="modal-footer justify-content-between">
            <a href="https://en.wikipedia.org/wiki/Neutrophil" rel="noopener" target="_blank" class="btn btn-info">
                <i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>
                More information
            </a>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NeutrophilModal'
    };
</script>