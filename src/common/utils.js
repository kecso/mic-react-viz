define(['./constants'], function (CONSTANTS) {
    return {
        getBoardDescriptor: (core, META, boardNode, nodeHash) => {
            const board = [];
            for(let i=0;i<9;i+=1) {
                board.push(CONSTANTS.PIECE.EMPTY);
            }
            core.getChildrenPaths(boardNode).forEach(tile => {
                const node = nodeHash[tile];
                const position = Number(core.getAttribute(node, 'position')) - 1;
                let value = CONSTANTS.PIECE.EMPTY;
                const pieces = core.getChildrenPaths(node);
                if(pieces.length > 0) {
                    value = core.isInstanceOf(nodeHash[pieces[0]], META.TicTacToe_X) ? 
                        CONSTANTS.PIECE.X : CONSTANTS.PIECE.O;
                }
                board[position] = value;
            });
            return board;
        },
        getPositionHash: (core, boardNode, nodeHash) => {
            const hash = {};
            core.getChildrenPaths(boardNode).forEach(tile => {
                const node = nodeHash[tile];
                const position = Number(core.getAttribute(node, 'position')) - 1;
                hash[position] = core.getPath(node);
            });
            return hash;
        }
    }
});

