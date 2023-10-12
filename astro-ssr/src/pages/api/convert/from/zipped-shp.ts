import AdmZip from "adm-zip";
import shapefile from "shapefile";
import { Readable } from "stream";
import arrayBufferToBuffer from "arraybuffer-to-buffer";
import type { APIRoute } from "astro";

function bufferToReadable(buffer: Buffer): Readable {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export const post: APIRoute = async ({ request }) => {
  const arrayBuffer = await request.arrayBuffer();
  const buffer = arrayBufferToBuffer(arrayBuffer);

  try {
    const zip = new AdmZip(buffer);
    const files = zip.getEntries();

    const shp = files.find((file) => file.name.endsWith(".shp"));
    const dbf = files.find((file) => file.name.endsWith(".dbf"));

    if (shp && dbf) {
      const geojson = await shapefile.read(
        bufferToReadable(shp.getData()),
        bufferToReadable(dbf.getData())
      );
      return new Response(JSON.stringify(geojson));
    }

    return new Response("shp and dbf files are not included in zip file", {
      status: 500,
    });
  } catch (err: any) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
