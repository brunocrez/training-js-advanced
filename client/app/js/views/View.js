class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }

    template(modelo) {
        throw new Error('Esse método deve ser implementado!');
    }
}