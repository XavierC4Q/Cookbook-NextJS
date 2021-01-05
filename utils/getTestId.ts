import { v4 as uuid } from "uuid";

export default function getTestIDs() {
  if (process.env.NODE_ENV !== "test") return {} as any;

  let ids = new Map();
  let proxy = new Proxy(
    {},
    {
      get: function (obj, prop) {
        if (ids.has(prop) === false) {
          ids.set(prop, uuid());
        }
        return ids.get(prop);
      },
    }
  );
  return proxy;
}
