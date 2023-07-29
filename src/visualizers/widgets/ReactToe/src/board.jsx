import CONSTANTS from 'constants.js';
import Tile from './tile';

export default function Board({player, board, win}) {

    const getTiles = () => {
        const tiles = [];
        board.forEach((value, index) => {
            tiles.push(<Tile key={'tile_' + index} player={player} piece={value} position={index} win={win}/>);
        });

        return tiles;
    }

    return (
        <div style={{
            display:'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0px',
            width: '300px'
        }}>
            {getTiles()}
        </div>
    )
}