import { createClient } from "redis";

const redisUrl = "";

const client = createClient({ url: redisUrl });

client.on("connect", () => console.log("Cache is connecting"));
client.on("ready", () => console.log("Cache is ready"));
client.on("end", () => console.log("Cache disconnected"));
client.on("error", (e) => console.log(e));

export default client;
