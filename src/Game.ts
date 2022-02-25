export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    /*  Code Smells -->
        Comments - if the methods/parameters were more though out comments wouldn't be needed
        Large Class - could this class be shortend?
        Long Method - > 10 lines - looks like it could be easily refactored into
                      smaller methods, which would also help remove comments by 
                      including good method descriptions


     */

    private ensureXPlaysFirst(symbol:string) {
        if (this._lastSymbol == ' ') {
            if (symbol == 'O') {
                throw new Error("Invalid first player");
            }
        }
    }  

    private ensurePlayerNotRepeated(symbol:string) {
        if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        }    
    }

    private ensureTileIsEmpty(symbol:string,x: number, y: number){
        if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }        
    }

    private updateGameState(symbol:string,x: number, y: number){
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);            
    }

    public Play(symbol: string, x: number, y: number) : void {
        this.ensureXPlaysFirst(symbol);
        this.ensurePlayerNotRepeated(symbol);
        this.ensureTileIsEmpty(symbol, x, y);
        this.updateGameState(symbol, x, y);
    }

        // Incomplete refactor ->
//     private checkRowIsSameSymbol(symbol:string, row:number): Boolean {
//         if (this._board.TileAt(0, 0)!.Symbol ==
//         this._board.TileAt(0, 1)!.Symbol &&
//         this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
//     return this._board.TileAt(0, 0)!.Symbol;
// }        


    public Winner() : string {
        //if the positions in first row are taken
        if (this._board.TileAt(0, 0)!.Symbol != ' ' &&
                this._board.TileAt(0, 1)!.Symbol != ' ' &&
                this._board.TileAt(0, 2)!.Symbol != ' ') {
            //if first row is full with same symbol
            if (this._board.TileAt(0, 0)!.Symbol ==
                    this._board.TileAt(0, 1)!.Symbol &&
                    this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol) {
                return this._board.TileAt(0, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt(1, 0)!.Symbol != ' ' &&
                this._board.TileAt(1, 1)!.Symbol != ' ' &&
                this._board.TileAt(1, 2)!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt(1, 0)!.Symbol ==
                    this._board.TileAt(1, 1)!.Symbol &&
                    this._board.TileAt(1, 2)!.Symbol ==
                            this._board.TileAt(1, 1)!.Symbol) {
                return this._board.TileAt(1, 0)!.Symbol;
            }
        }

        //if the positions in first row are taken
        if (this._board.TileAt(2, 0)!.Symbol != ' ' &&
                this._board.TileAt(2, 1)!.Symbol != ' ' &&
                this._board.TileAt(2, 2)!.Symbol != ' ') {
            //if middle row is full with same symbol
            if (this._board.TileAt(2, 0)!.Symbol ==
                    this._board.TileAt(2, 1)!.Symbol &&
                    this._board.TileAt(2, 2)!.Symbol ==
                            this._board.TileAt(2, 1)!.Symbol) {
                return this._board.TileAt(2, 0)!.Symbol;
            }
        }

        return ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: string;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x:  number, y: number): Tile {
        return this._plays.find((t:Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number) : void
    {
        const tile : Tile = {X :x, Y:y, Symbol:symbol};

        this._plays.find((t:Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}