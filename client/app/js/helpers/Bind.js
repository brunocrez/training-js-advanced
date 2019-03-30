class Bind {

    // REST operator ~> a partir de view, podemos inserir n parâmetros que serão armazenados no array props
    constructor(model, view, ...props) {

        let proxy = ProxyFactory.create(
            model,
            props,
            model => view.update(model)
        );

        view.update(model);

        return proxy;
    }
}