# bitburner-scripts

A collection of bitburner scripts that I used to play the game.

The initial project template is build on bitburner official typescript template which includes the remote API feature. This allows directly working with bitburner's API from your local IDE.

## Getting Started

Run `npm install` to install all the dependencies.
Run `npm run watch` to open the API connection.

The default port is set to `12525`.

Open the game options, set the API port and click on the `Connect` button.

Additional documentation on the template can be found [on the official repository](https://github.com/bitburner-official/typescript-template).

## Gameplay

I'm going to do my best to commit scripts sequentially, as I progress through the game. Starting from a fresh install, fresh template, and fresh character. We have no root access to any remote servers, and only access to the Nuke.exe program. With a couple basic scripts, initial progress should come quickly. Then we can start to automate the process of gaining root access to remote servers, and start to build up our hacking empire.

The ultimate goal is to be able to completely automate the workflow the game.

### Day 1

Starting a new game and connecting the web socket copies over the `template.js` file. We have $1.113k and a 8GB home server. First order of business is to make some money. The goal here is automation. I'd like to start by generating a server list that we can use repeatedly.

- [x] Create a script that will generate a list of servers to hack.

`scanToFile.js` scans the local network for servers, and stores the hostnames to a JSON-formatted file called `servers.js`. Files created in-game are not copied back to our local machine. We don't need them to develop our scripts, but they might be useful for reference and debugging. Download a file from the game with the `download` command, and I've been storing them in the `download` folder for quick access. I don't want these dymamically created files to end up in the dist, so ensure they do not get copied to `src`.

Now we have our list of servers, we can use it to connect and root them.

- [x] Create a script that will connect to a server and root it.

`conn.js` will connect to a server and root it. The root process can only be done if we meet the hacking level, which will continuously increase. As our hacking level increases, we want to ensure we gain access to newly available servers. Running `conn.js` continually will ensure we are always connected to the highest level server we can access. We will have to later modify our scans to append to the `servers.txt` file to ensure we access new servers. We also want to skip servers that we have already rooted, or too high of a hacking level.

We have access to our first servers and now its time to hack them.

- [x] Create a script that will hack a server.

`basicHack.js` will execute a self-contained hack that includes grow(), weaken() and hack() in the same file. To automate this, we will require a script that looks for rooted servers, copies the hack file to them, and executes it. For that we will need another file that is running on our home server, `copyHacks.js`. I've begun to copy the code for excluded servers, so we might as well make that a seperate file too, `excludedServers.txt`.

With our 3 scripts running, `conn.js` and `copyHacks.js` at home, and `basicHack.js` on the remote servers, we can now automate the process of hacking servers. We can now start to make some money. `conn.js` and `copyHacks.js` keep running on the home server, and will hack, copy and execute on new servers as our hack level grows.

#### Day 1 Summary

- [x] Create a script that will generate a list of servers to hack.
- [x] Create a script that will connect to a server and root it.
- [x] Create a script that will hack a server.
- [x] Leave scripts running on home server
