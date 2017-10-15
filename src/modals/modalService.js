class ModalService {

    componentName = null;
    listeners = {
        show: [],
        hide: []
    };

    init() {
        $('#modal')
            .on('show.bs.modal', () => this.callShowListeners())
            .on('hide.bs.modal', () => this.callHideListeners());
    }

    showBacteriaModal() {
        return this.showModal('BacteriaModal');
    }

    showMacrophageModal() {
        return this.showModal('MacrophageModal');
    }

    showNeutrophilModal() {
        return this.showModal('NeutrophilModal');
    }

    showModal(componentName) {
        this.componentName = componentName;

        return new Promise(resolve => {
            $('#modal').modal().on('hide.bs.modal', resolve);
        });
    }

    onShow(listener) {
        this.listeners.show.push(listener);
    }

    onHide(listener) {
        this.listeners.hide.push(listener);
    }

    callShowListeners() {
        this.listeners.show.forEach(listener => listener());
    }

    callHideListeners() {
        this.listeners.hide.forEach(listener => listener());
    }

}

export default new ModalService();