import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(
  ({ clientAddress, redirect }, next) => {
    const IPs = import.meta.env.IP_WHITELIST.split(",") as string[];

    if (!IPs.includes(clientAddress)) return redirect("/blocked");

    // console.log("IP Address", clientAddress);
    return next();
  }
);
