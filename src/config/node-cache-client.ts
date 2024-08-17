import Cache from "node-cache";

const client = new Cache({ stdTTL: 24 * 60 * 60, checkperiod: 24 * 60 * 60 });

export { client as CacheClient };
