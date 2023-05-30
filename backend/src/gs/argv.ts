const port = Number(process.argv[2]);
const serverName = process.argv[3];
const uuid = process.argv[4];

const argv = { port, serverName, uuid };

export { argv };
