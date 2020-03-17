import { ItemME } from "./item-me";

export class VisaoMovimentacaoEstoque {

    quantidade(): number {
        return Number(
            ( document.getElementById( 'quantidade' ) as HTMLInputElement )?.value || 0 );
    }

    codigoProduto(): string {
        return ( document.getElementById( 'codigo' ) as HTMLInputElement )?.value || '';
    }

    aoClicarEmAdicionar( evento: any ): void {
        document.getElementById( 'adicionar' )?.addEventListener( "click", evento );
    }

    aoClicarEmEnviar( evento: any ): void {
        document.getElementById( 'enviar' )?.addEventListener( "click", evento );
    }

    adicionarItem( numero: number, item: ItemME ): void {
        const corpo = document.querySelector( '#itens tbody' );
        const linha = document.createElement( 'tr' );

        const col1 = document.createElement( 'td' );
        col1.appendChild( document.createTextNode( numero.toString() ) );
        linha.appendChild( col1 );

        const col2 = document.createElement( 'td' );
        col2.appendChild( document.createTextNode( item.produto.codigo ) );
        linha.appendChild( col2 );

        const col3 = document.createElement( 'td' );
        col3.appendChild( document.createTextNode( item.produto.descricao ) );
        linha.appendChild( col3 );

        const col4 = document.createElement( 'td' );
        col4.appendChild( document.createTextNode( item.quantidade.toString() ) );
        linha.appendChild( col4 );

        corpo?.appendChild( linha );
    }

    mostrarMensagem( mensagem: string, campo?: string ): void {
        alert( mensagem );
        switch ( campo ) {
            case "quantidade": {
                document.getElementById( 'quantidade' )?.focus();
                break;
            }
            case "codigoProduto": {
                document.getElementById( 'codigo' )?.focus();
                break;
            }
        }
    }

}