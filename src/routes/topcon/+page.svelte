<h1>TOPCON Ditch Volume</h1>

<p class="mb-2">
  Calculates the volume of a ditch based on the difference in height of the
  designed ditch bottom and survey shots of construction grade, along with
  side-wall slope and the width of ditch bottom.
</p>
<p class="mb-2">
  Designed ditch bottom is supplied as a 3D SHP file. Survey points are in a CSV
  file in the format ID,X,Y,Z,DESC. Both shall be in the UTM coordinate system
  EPSG:26910 (Zone 10N).
</p>

<h2>Parameters</h2>
<form method="post" enctype="multipart/form-data" class="mb-3">
  <div class="mb-4">
    <label class="block text-gray-500 text-sm font-bold mb-2" for="slope"
      >Slope of Ditch Sides [slope:1]</label
    >
    <input
      class="border rounded px-2 py-1 appearance-none w-full"
      type="number"
      name="slope"
      step="0.5"
      min="0"
    />
  </div>

  <div class="mb-4">
    <label class=" text-gray-500 text-sm font-bold mb-2" for="width_bot"
      >Width of Ditch Bottom [m]</label
    >
    <input
      class="border rounded px-2 py-1 appearance-none w-full"
      type="number"
      name="width_bot"
      step="0.5"
      min="0"
    />
  </div>

  <div class="mb-4">
    <label class=" text-gray-500 text-sm font-bold mb-2" for="ditch_profile"
      >Designed Ditch Profile [SHP]</label
    >
    <input
      class="text-sm w-full"
      type="file"
      name="ditch_profile"
      accept=".shp"
    />
    <p>3D SHP file of bottom of ditch</p>
  </div>

  <div class="mb-4">
    <label for="ground_profile">Surveyed Ground Profile [CSV]</label>
    <input
      class="text-sm w-full"
      type="file"
      name="ground_profile"
      accept=".csv"
    />
    <p>Survey shots as CSV file in the format ID,X,Y,Z,DESC</p>
  </div>

  <button class="btn btn-primary" type="submit">Submit</button>
</form>

<h2>Results</h2>
