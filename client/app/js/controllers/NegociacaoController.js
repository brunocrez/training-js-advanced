class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);        

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona',
            'esvazia'
        );
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        );
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();     
    }

    importarNegociacoes() {
        let service = new NegociacaoService()
        
        Promise.all([
            service.obterNegociacoesSemana(),
            service.obterNegociacoesSemanaAnterior(),
            service.obterNegociacoesSemanaRetrasada()
        ])
            .then(negociacoes => {
                negociacoes
                    .reduce((flatArray, array) => flatArray.concat(array), [])
                    .forEach(item => this._listaNegociacoes.adiciona(item))
                    this._mensagem.texto = 'Negociações importadas com sucesso!'
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociação(ões) apagada(s) com sucesso!';
    }
}