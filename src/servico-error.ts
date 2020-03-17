
export class ServicoError extends Error {

    constructor(
        mensagem?: string,
        private campo?: string
    ) {
        super( mensagem );
    }

    name = 'ServicoError';

}