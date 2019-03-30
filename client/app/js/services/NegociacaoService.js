class NegociacaoService {

    /*  0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição está concluída e a resposta está pronta
    */
    
    constructor() {
        this.http = new HttpService()
    }

    obterNegociacoesSemana() {

        return new Promise((resolve, reject) => {
            this.http
                .get('negociacoes/semana')
                .then(negociacoes => 
                    resolve(negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))))
                .catch(erro => {
                    console.log(erro)
                    reject('Não foi possível obter as negociações da semana!')
                })
        })
    }

    obterNegociacoesSemanaAnterior() {

        return new Promise((resolve, reject) => {
            this.http
                .get('negociacoes/anterior')
                .then(negociacoes => 
                    resolve(negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))))
                .catch(erro => {
                    console.log(erro)
                    reject('Não foi possível obter as negociações da semana!')
                })
        })
    }

    obterNegociacoesSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this.http
                .get('negociacoes/retrasada')
                .then(negociacoes => 
                    resolve(negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))))
                .catch(erro => {
                    console.log(erro)
                    reject('Não foi possível obter as negociações da semana!')
                })
        })
    }    
}