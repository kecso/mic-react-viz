"""
This is where the implementation of the plugin code goes.
The CreateGame-class is imported from both run_plugin.py and run_debug.py
"""
import sys
import logging
from webgme_bindings import PluginBase

# Setup a logger
logger = logging.getLogger('CreateGame')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)  # By default it logs to stderr..
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


class CreateGame(PluginBase):
    def main(self):
        core = self.core
        root_node = self.root_node
        active_node = self.active_node #the context should be the games folder
        META = self.META
        max_index = -1
        index = 0

        logger.error('inside the code')
        logger.error(active_node)
        for child in core.load_children(active_node):
            name = core.get_attribute(child,'name')
            if(len(name.split('-')) > 1):
                index = int(name.split('-')[1])
            if index > max_index:
                max_index = index
        new_game = core.create_node({
            'parent': active_node, 
            'base': META['TicTacToeGame']
        });
        core.set_attribute(new_game, 'name', 'game-' + format(max_index+1, '03d'))
        
        # As the ticatactoegame prototype already has everything setup we do not need
        # to do anything further.
        self.util.save(root_node, self.commit_hash, 'master', 'created a new game object which should be renamed')
        self.create_message(active_node, core.get_path(new_game))
