export class ColecaoEmStorage< T > {

    constructor(
        private chave: string,
        private storage: Storage = localStorage
        ) {
    }

    async esvaziar(): Promise< void > {
        this.storage.removeItem( this.chave );
    }

    async adicionar( item: T ): Promise< void > {
        let itens = await this.todos();
        itens.push( item );
        this.gravarItens( itens );
    }

    async todos(): Promise< Array< T > > {
        return this.itens();
    }

    protected itens(): Array< T > {
        const itensStr: string | null = this.storage.getItem( this.chave );
        let itens: Array< T > = [];
        if ( itensStr ) {
            itens = JSON.parse( itensStr ) as Array< T >;
        }
        return itens;
    }

    protected gravarItens( itens: Array< T > ): void {
        this.storage.setItem( this.chave, JSON.stringify( itens ) );
    }

}