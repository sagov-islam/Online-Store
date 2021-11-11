'use strict'



class Modal {
    constructor(modalName, title, btnText, inputs, functionName) {
        this.modalName = modalName
        this.title = title;
        this.btnText = btnText;
        this.inputsProps = inputs;
        this.functionName = functionName
    }

    closeModal(btn) {
        const parent = btn.parentNode.parentNode;
        parent.classList.remove('es-show--animation');
        parent.classList.add('es-hide--animation');

        deleteWarning(['es-warning-signIn-error', 'es-warning-signIn-success']);
    }



    render() {
        let inputs = ''
        this.inputsProps.forEach(item => {
            let required = ''
            if (item.required === true) {
                required = 'required'
            }
            const input = `
                <input class="es-input-text es-input--hover es-input--focus es-margin-top" type="${item.type}" name="${item.name}" placeholder="${item.placeholder}" ${required}>
            `
            inputs += input
        });
        
        

        const modalHtml = () => {
            return `
            <div class="es-modal-bg es-hide--animation" id="es-modal-${this.modalName}">
                <div class="es-modal">
                    <button class="es-btn-delete es-modal__btn-delete" onclick="modal.closeModal(this)">
                        <svg class="es-btn-delete-icon" width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.908239 1.8135C0.697254 1.60257 0.697254 1.25151 0.908239 1.0332C1.1266 0.822267 1.47038 0.822267 1.68874 1.0332L6.37223 5.72338L11.0636 1.0332C11.2746 0.822267 11.6257 0.822267 11.8362 1.0332C12.0546 1.25151 12.0546 1.60306 11.8362 1.8135L7.15273 6.49631L11.8362 11.1865C12.0546 11.3974 12.0546 11.7485 11.8362 11.9668C11.6252 12.1777 11.2741 12.1777 11.0636 11.9668L6.37223 7.27662L1.68874 11.9668C1.47038 12.1777 1.1266 12.1777 0.908239 11.9668C0.697254 11.7485 0.697254 11.3969 0.908239 11.1865L5.59173 6.49631L0.908239 1.8135Z"/>
                        </svg>
                    </button>
                    <h2 class="es-title--h2 es-modal__title">${this.title}</h2>
                    <form class="es-modal__form" id="es-form-${this.modalName}" action="#" name="${this.modalName}">
                        ${inputs}
                        <button class="es-btn es-btn--size-all-width es-btn--style-inherit-orange es-margin-top" type="submit">${this.btnText}</button>
                    </form>

                </div>
            </div>
            `
        };

        document.body.insertAdjacentHTML("afterbegin", modalHtml());
        if (this.functionName) {
            this.functionName()
        }
    }
}

const modal = new Modal();