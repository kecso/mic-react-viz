/*globals define*/
/*eslint-env node, browser*/

/**
 * Generated by PluginGenerator 2.20.5 from webgme on Fri Jul 21 2023 23:41:07 GMT-0500 (Central Daylight Time).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
 */

define([
    'plugin/PluginConfig',
    'text!./metadata.json',
    'plugin/PluginBase',
    'mic-react-viz/utils',
    'mic-react-viz/constants'
], function (
    PluginConfig,
    pluginMetadata,
    PluginBase,
    UTILS,
    CONSTANTS) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    /**
     * Initializes a new instance of CheckWinCondition.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin CheckWinCondition.
     * @constructor
     */
    function CheckWinCondition() {
        // Call base class' constructor.
        PluginBase.call(this);
        this.pluginMetadata = pluginMetadata;
    }

    /**
     * Metadata associated with the plugin. Contains id, name, version, description, icon, configStructure etc.
     * This is also available at the instance at this.pluginMetadata.
     * @type {object}
     */
    CheckWinCondition.metadata = pluginMetadata;

    // Prototypical inheritance from PluginBase.
    CheckWinCondition.prototype = Object.create(PluginBase.prototype);
    CheckWinCondition.prototype.constructor = CheckWinCondition;

    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(Error|null, plugin.PluginResult)} callback - the result callback
     */
    CheckWinCondition.prototype.main = function (callback) {
        // Use this to access core, project, result, logger etc from PluginBase.
        const {core, META, logger, activeNode, result} = this;

        core.loadSubTree(activeNode)
        .then(nodes=>{
            const nodeHash = {};
            nodes.forEach(node => {
                nodeHash[core.getPath(node)] = node;
            });
            let boardNode = null;
            core.getChildrenPaths(activeNode).forEach(playerOrBoard => {
                const node = nodeHash[playerOrBoard];
                if(core.isInstanceOf(node,META.Board)) {
                   boardNode = node;
                }
            });
            const board = UTILS.getBoardDescriptor(core, META, boardNode, nodeHash);
            const checks=[
                [0,1,2], [3,4,5], [6,7,8], // 0 1 2      0+1+2, 3+4+5, 6+7+8
                [0,4,8], [2,4,6],          // 3 4 5  =>  0+4+8, 2+4+6
                [0,3,6], [1,4,7], [2,5,8]  // 6 7 8      0+3+6, 1+4+7, 2+5+8
            ];

            let winner = null;
            checks.forEach(check => {
                if( board[check[0]] !== CONSTANTS.PIECE.EMPTY &&
                    board[check[0]] === board[check[1]] &&
                    board[check[1]] === board[check[2]]) {
                        winner ={};
                        winner.player = board[check[0]] === CONSTANTS.PIECE.X ? CONSTANTS.PLAYER.X : CONSTANTS.PLAYER.O;
                        winner.positions = check;
                    }
            });
            this.createMessage(activeNode, JSON.stringify(winner));

            result.setSuccess(true);
            callback(null, result);
        })
        .catch(e=>{
            logger.error(e);
            result.setSuccess(false);
            callback(e, null);
        });
    };

    return CheckWinCondition;
});
