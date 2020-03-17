import { Produto } from "./produto";

export interface ColecaoProduto {

    todos(): Promise< Array< Produto > >;

    esvaziar(): Promise< void >;

    adicionar( produto: Produto ): Promise< void >;

    aumentarEstoque( codigo: string, quantidade: number ): Promise< void >;

    diminuirEstoque( codigo: string, quantidade: number ): Promise< void >;

    produtoComCodigo( codigo: string ): Promise< Produto | null >;

}