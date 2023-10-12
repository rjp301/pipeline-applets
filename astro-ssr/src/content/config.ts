import { z, defineCollection } from "astro:content";

const crsCollection = defineCollection({
  type: "data",
  schema: z.object({ name: z.string(), epsg: z.number(), proj: z.string() }),
});

const centerlineCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    markers: z.array(
      z.object({ value: z.number(), x: z.number(), y: z.number() })
    ),
    coordinates: z.array(z.array(z.number())),
  }),
});

export const collections = {
  crs: crsCollection,
  centerline: centerlineCollection,
};
