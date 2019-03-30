class ProxyFactory {

    /**
     * target ~> objeto real que é encapsulado pelo proxy
     * prop ~> propriedade que está sendo lida no momento
     * value (set) ~> valor a ser definido na propriedade
     * receiver ~> referência ao próprio proxy
     **/

    static create(objeto, propriedades, acao) {

        return new Proxy(objeto, {

            get(target, prop, receiver) {
                if (propriedades.includes(prop) && ProxyFactory._isFunction(target[prop])) {

                    return function() {
                        console.log(`Interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(foo) {
        return typeof(foo) == typeof(Function);
    }
}