import CONSTANTS from 'src/common/constants';
import Tile from './tile';

export default function Board(props) {
    const {player, board} = this;

    getTiles = () => {
        const tiles = [];
        board.forEach((value, index) => {
            tiles.push(<Tile player={player} piece={value} position={index}/>);
        });

        return tiles;
    }
    return (
        <div>
            {getTiles()}
        </div>
    )
}