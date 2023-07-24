import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CONSTANTS from 'src/common/constants';

export default function Tile(props) {
    const {player, piece, position} = props;

    onTileClick = () => {
        if (piece === CONSTANTS.PIECE.EMPTY) {
            WEBGME_CONTROL.playerMoves(player, position);
        }
    }

    getPiece = () => {
        switch (piece) {
            case CONSTANTS.PIECE.O:
                return (
                <FontAwesomeIcon 
                    icon={icon({name:'o', family:'classic', style:'duotone'})} size='xl'
                />);
            case CONSTANTS.PIECE.X:
                return (
                <FontAwesomeIcon 
                    icon={icon({name:'x', family:'classic', style:'duotone'})} size='xl'
                />);
            default:
                return null;
        }
    }

    return (
        <div onClick={onTileClick}>{getPiece()}</div>
    );
}