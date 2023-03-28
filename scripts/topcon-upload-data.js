import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

const dataPath = "/Users/riley/Desktop/topcon_runs";

const runs = await fs.readdir(dataPath);
console.log("runs", runs);
for (const run of runs) {
  const fname = path.join(dataPath, run);
  const json = await fs.readFile(fname);
  const object = JSON.parse(json);

  
}
