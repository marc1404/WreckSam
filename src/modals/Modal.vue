<template>
    <div id="modal" class="modal">
        <div class="modal-dialog" role="document">
            <component :is="modalService.componentName"></component>
        </div>
    </div>
</template>

<script>
    import modalService from './modalService';
    import BacteriaModal from './BacteriaModal.vue';
    import MacrophageModal from './MacrophageModal.vue';
    import NeutrophilModal from './NeutrophilModal.vue';
    import BacteriaOverloadModal from './BacteriaOverloadModal.vue';
    import InitialExplanationModal from './InitialExplanationModal.vue';

    export default {
        name: 'Modal',
        components: {
            BacteriaModal,
            MacrophageModal,
            NeutrophilModal,
            BacteriaOverloadModal,
            InitialExplanationModal
        },
        data() {
            return {
                modalService: modalService
            };
        },
        mounted() {
            modalService.init();
        }
    };
</script>