class DateHelper {

    constructor() {
        throw new Error('Date Helper não pode ser instanciado!');
    }

    static textoParaData(texto) {
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
}