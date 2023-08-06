/* eslint-disable no-constant-condition */
/**
 * @param {NS} ns
 *
 * This script connects to servers and roots them.
 */

export async function main(ns) {
	if (!ns.fileExists("servers.txt")) {
		// ns.tprint("servers.txt not found. Run scanToFile.js first.");
	}

	// ns.tprint("servers.txt found. Scanning servers...");

	while (true) {
		const serverData = ns.read("servers.txt");
		const servers = JSON.parse(serverData);

		const excludedServers = ["home", "darkweb"];

		for (const server of servers) {
			// ns.tprint("checking: " + server);

			/* exclude unique servers */
			if (excludedServers.includes(server)) {
				// ns.tprint("excluded unique: " + server);
				continue;
			}

			/* exclude servers that are already rooted */
			if (ns.hasRootAccess(server)) {
				// ns.tprint("excluded nuked: " + server);
				continue;
			}

			/* exclude servers that are too high level */
			if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server)) {
				// ns.tprint("excluded hack level: " + server);
				continue;
			}

			/* exclude servers with too many ports */
			if (ns.getServerNumPortsRequired(server) > 0) {
				// ns.tprint("excluded ports: " + server);
				continue;
			}

			// ns.tprint("nuking: " + server);
			ns.nuke(server);
			// ns.tprint("nuked: " + server);
		}

		// sleep for a cycle
		const sleepTime = 10000; // 10 seconds
		// ns.tprint("sleeping for " + sleepTime + "ms");
		await ns.sleep(sleepTime);
	}
}
