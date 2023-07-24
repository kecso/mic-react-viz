# mic-react-viz
The purpose of this design studio is to collect helpful resources for students of MIC course.
The description will talk about the different components and configuration options that need to be taken
to allow the studio to work.
## Installation
To install this design studio, you have two options. You can either choose the preferred docker based deployment
 or you can stick to the standard way that involves more installation.

### Docker based deplyoment
You are going to need install [Docker](https://www.docker.com/) on your machine and fetch this code. Once
 everything is downloaded you just need to initiate a `docker-compose up -d` command to start all necessary
 containers and access the server at the localhost:8888 port. Be mindful that your database will be stored in the
 `db` subdirectory, so make sure you are not editing it manually. Also be mindful that instead of the `default` 
 configuration, this deployment uses the `dc` one.
### Basic deployment
For a regular deployment, you need to install the following components on top of fetching this repository:
- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/)

After all components in place, you need to install the dependencies, using `npm i` command and start your deployment 
using the `node ./app.js` command. If you have not changed the configuration, your design studio should be accessible on 
port 8888 of your localhost.

## Development
If you are using this repository as an example and would like to 'recreate' it or add further components to it, you are
going to need additional software:
- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [WebGME-CLI](https://www.npmjs.com/package/webgme-cli) (latest recommended)

You are going to use nodejs to bring in potentially new components or dependencies while the CLI is there to generate or import design studio components with handling the necessary config updates as well.

## Components
We are going to list the available components in this studio as well as describing how they can be created or what 
needs to be set for them to work as intended.

### Seed
There is a single seed in the project representing the example studio - tictactoe - but all other default seeds are also available.

To create new one, just use the command `webgme new seed -f mySeedFile.webgmex mySeedName`.

### Plugin
There are three plugins in this studio to showcase the currently available languages for interpretations.
- CreateGame: this plugin is written in python and responsible for creating a game in the proper folder with the start state.
- CheckWinCondition: this plugin is written in javascript and simply checks if one of the players has won the game.
- BuildDescriptor: this plugin is written in javascript and shows how a structured data representing the model for the visualization can be created with a plugin - which allows for a more generalized approach and minimizes the need for learning all the different APIs of the system.

