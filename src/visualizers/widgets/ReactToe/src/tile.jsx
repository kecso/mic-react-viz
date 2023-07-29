import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from 'react';
import CONSTANTS from 'constants.js';

export default function Tile({player, piece, position, win}) {

    const [hasMouse, setMouse, onHasMouseChange] = useState(false);

    const onTileClick = () => {
        if (piece === CONSTANTS.PIECE.EMPTY) {
            WEBGME_CONTROL.playerMoves(player, position);
        }
    }

    const onMouseEnter = () => {
        setMouse(true);
    }

    const onMouseLeave = () => {
        setMouse(false);
    }

    const getPiece = () => {
        console.log('GP:',player,piece,position,win);
        const styleO = {fontSize:'90px', paddingLeft:'8px',paddingTop:'2px'};
        const styleX = {fontSize:'90px', paddingLeft:'13px',paddingTop:'2px'};
        const dStyle = player === CONSTANTS.PLAYER.O ? 
            JSON.parse(JSON.stringify(styleO)) : 
            JSON.parse(JSON.stringify(styleX));
        dStyle.opacity = 0.5;

        let style = dStyle;
        let myIcon = null;
        switch (piece) {
            case CONSTANTS.PIECE.O:
                style = styleO;
                myIcon = icon({name:'o', family:'classic', style:'solid'});
                break;
            case CONSTANTS.PIECE.X:
                style = styleX;
                myIcon = icon({name:'x', family:'classic', style:'solid'});
                break;
            default:
                if(hasMouse) {
                    if(player === CONSTANTS.PLAYER.O) {
                        myIcon = icon({name:'o', family:'classic', style:'solid'});
                    } else {
                        myIcon = icon({name:'x', family:'classic', style:'solid'});
                    }
                }
        }

        if(myIcon !== null) {
            return (<FontAwesomeIcon style={style} icon={myIcon} size='xl'/>); 
        }

        return null;
    }

    const getTile = () => {
        const style = {
            width:'100px', 
            height:'100px', 
            borderColor:'black',
            borderWidth:'2px',
            border:'solid'};

            if (win && win.positions.indexOf(position) !== -1) {
                style.backgroundColor = '#EE2E31';
            } else if(hasMouse) {
                if(piece === CONSTANTS.PIECE.EMPTY) {
                    style.backgroundColor = '#F4C095';
                } else {
                    style.backgroundColor = '#1D7874';
                    style.opacity = 0.75;
                }
            }
            return (<div onClick={onTileClick} 
                style={style}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>{getPiece()}</div>);
    }

    return getTile();
}