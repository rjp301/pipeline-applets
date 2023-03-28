<main class="max-w-3xl p-4 mx-auto flex flex-col gap-2">
  <h1>TOPCON Ditch Volume</h1>

  <p>
    Calculates the volume of a ditch based on the difference in height of the
    designed ditch bottom and survey shots of construction grade, along with
    side-wall slope and the width of ditch bottom.
  </p>
  <p>
    Ensure Ditch Profile and Ground Shots are in the same UTM coordinate system
    as the selected centerline.
  </p>

  <h2>Parameters</h2>
  <form method="post" enctype="multipart/form-data" class="flex flex-col gap-2">
    <div>
      <label for="centerline">Centerline</label>
      <input type="radio" name="" id="" />
    </div>

    <div>
      <label for="slope">Slope of Ditch Sides [slope:1]</label>
      <input
        class="border rounded px-2 py-1 appearance-none w-full"
        type="number"
        name="slope"
        step="0.5"
        min="0"
      />
    </div>

    <div>
      <label for="width_bot">Width of Ditch Bottom [m]</label>
      <input
        class="border rounded px-2 py-1 appearance-none w-full"
        type="number"
        name="width_bot"
        step="0.5"
        min="0"
      />
    </div>

    <div>
      <label for="ditch_profile">Designed Ditch Profile [SHP]</label>
      <input
        class="text-sm w-full"
        type="file"
        name="ditch_profile"
        accept=".shp"
      />
      <p class="form-caption">3D SHP file of bottom of ditch</p>
    </div>

    <div>
      <label for="ground_profile">Surveyed Ground Profile [CSV]</label>
      <input
        class="text-sm w-full"
        type="file"
        name="ground_profile"
        accept=".csv"
      />
      <p class="form-caption">
        Survey shots as CSV file in the format ID, X, Y, Z, DESC
      </p>
    </div>

    <div class="flex gap-4">
      <button class="btn w-full" type="submit">Submit</button>
      <button class="btn w-full" type="reset">Reset</button>
    </div>
  </form>

  <h2>Results</h2>
</main>
