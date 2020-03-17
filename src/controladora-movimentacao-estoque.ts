import { VisaoMovimentacaoEstoque } from "./visao-movimentacao-estoque";
import { ServicoMovimentacaoEstoque } from "./servico-movimentacao-estoque";
import { ColecaoProdutoEmLocalStorage } from "./colecao-produto-em-local-storage";
import { ColecaoMovimentacaoEstoqueEmLocalStorage } from "./colecao-movimentacao-estoque-em-local-storage";
import { TipoME } from "./tipo-me";

export class ControladoraMovimentacaoEstoque {

    private visao: VisaoMovimentacaoEstoque = new VisaoMovimentacaoEstoque();

    private servico: ServicoMovimentacaoEstoque = new ServicoMovimentacaoEstoque(
            new ColecaoProdutoEmLocalStorage(),
            new ColecaoMovimentacaoEstoqueEmLocalStorage()
        );

    configurar() {
        this.visao.aoClicarEmAdicionar( this.adicionar );
        this.visao.aoClicarEmEnviar( this.enviar );
    }

    private adicionar = async () => {
        try {
            const item = await this.servico.adicionarItem(
                this.visao.quantidade(),
                this.visao.codigoProduto(),
                TipoME.ENTRADA  );

            this.visao.adicionarItem( this.servico.numeroItens() + 1, item );
        } catch ( e ) {
            this.visao.mostrarMensagem( e.message, e?.campo );
        }
    };

    private enviar = () => {};

}