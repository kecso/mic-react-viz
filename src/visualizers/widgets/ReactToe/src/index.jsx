import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import TicTacToe from './tictactoe';

const container = document.getElementById(VISUALIZER_INSTANCE_ID);
const root = ReactDOMClient.createRoot(container);
root.render(<TicTacToe></TicTacToe>);