import { ColecaoEmStorage } from "./colecao-em-storage";
import { MovimentacaoEstoque } from "./movimentacao-estoque";
import { ColecaoMovimentacaoEstoque } from "./colecao-movimentacao-estoque";

export class ColecaoMovimentacaoEstoqueEmLocalStorage
    extends ColecaoEmStorage< MovimentacaoEstoque >
    implements ColecaoMovimentacaoEstoque {

    constructor() {
        super( 'mov-estoque' );
    }

}