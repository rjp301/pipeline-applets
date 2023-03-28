import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

const dataPath = "/Users/riley/Desktop/test_centerline 5.24.16";

const CL = {};
CL.name = "TMEP S5B 5.24.16";
CL.description = "Trans Mountain Expansion Project - Spread 5B - REV 5.24.16";
CL.line = JSON.parse(
  await fs.readFile(path.join(dataPath, "centerline.geojson"))
);
CL.footprint = JSON.parse(
  await fs.readFile(path.join(dataPath, "footprint.geojson"))
);
CL.markers = JSON.parse(
  await fs.readFile(path.join(dataPath, "markers.geojson"))
);
CL.marker_value = "Measure";

CL.userId = "64233406f347ea40651dde5b";

const result = await prisma.centerline.create({ data: CL });

console.log(result);
