import { ItemME } from "./item-me";
import { TipoME } from "./tipo-me";

export class MovimentacaoEstoque {

    constructor(
        public id: number = 0,
        public dataHora: Date = new Date(),
        public motivo: string = "",
        public itens: ItemME[] = []
    ) {
    }

    public balanco(): number {
        let quantidade = 0;
        for ( const item of this.itens ) {
            if ( item.tipo === TipoME.ENTRADA ) {
                quantidade += item.quantidade;
            } else {
                quantidade -= item.quantidade;
            }
        }
        return quantidade;
    }

    public quantidades(): number {
        let quantidade = 0;
        for ( const item of this.itens ) {
            quantidade += item.quantidade;
        }
        return quantidade;
    }

    public adicionarItem( item: ItemME ): void {
        this.itens.push( item );
    }

}