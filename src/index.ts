import { ControladoraMovimentacaoEstoque } from "./controladora-movimentacao-estoque";

window.addEventListener( 'load', () => {
    let controladora = new ControladoraMovimentacaoEstoque();
    controladora.configurar();
} );