/**
 * @param {NS} ns
 *
 * This script scans the network and writes the results to a JSON file.
 */

export async function main(ns) {
	const servers = ns.scan();
	const serverData = JSON.stringify(servers);
	ns.write("servers.js", serverData, "w");
	ns.tprint("Server data written to servers.js");
}
