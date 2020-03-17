import { MovimentacaoEstoque } from "./movimentacao-estoque";

export interface ColecaoMovimentacaoEstoque {

    esvaziar(): Promise< void >;

    adicionar( me: MovimentacaoEstoque ): Promise< void >;

    todos(): Promise< Array< MovimentacaoEstoque > >;

}