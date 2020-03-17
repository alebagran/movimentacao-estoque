import { Produto } from "./produto";
import { TipoME } from "./tipo-me";

/**
 * Item de movimentação de estoque
 */
export class ItemME {

    constructor(
        private _produto: Produto,
        private _quantidade: number,
        private _tipo: TipoME
    ) {
    }

    get produto(): Produto {
        return this._produto;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    get tipo(): TipoME {
        return this._tipo;
    }

}