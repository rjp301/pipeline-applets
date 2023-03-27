<h1 class="text-xl font-bold">TOPCON Ditch Volume</h1>

<p>
  Calculates the volume of a ditch based on the difference in height of the
  designed ditch bottom and survey shots of construction grade, along with
  side-wall slope and the width of ditch bottom.
</p>
<p>
  Designed ditch bottom is supplied as a 3D SHP file. Survey points are in a CSV
  file in the format ID,X,Y,Z,DESC. Both shall be in the UTM coordinate system
  EPSG:26910 (Zone 10N).
</p>

<h2>Parameters</h2>
<form method="post" enctype="multipart/form-data" class="mb-3">
  <div class="row">
    <div class="col">
      <div class="form-group mb-3">
        <label class="form-label" for="slope"
          >Slope of Ditch Sides [slope:1]</label
        >
        <input
          type="number"
          class="form-control"
          name="slope"
          step="0.5"
          min="0"
        />
      </div>
      <div class="form-group mb-3">
        <label class="form-label" for="width_bot"
          >Width of Ditch Bottom [m]</label
        >
        <input
          type="number"
          class="form-control"
          name="width_bot"
          step="0.5"
          min="0"
        />
      </div>
    </div>
    <div class="col">
      <div class="form-group mb-3">
        <label class="form-label" for="ditch_profile"
          >Designed Ditch Profile [SHP]</label
        >
        <input
          type="file"
          class="form-control"
          name="ditch_profile"
          accept=".shp"
        />
      </div>
      <div class="form-group mb-3">
        <label class="form-label" for="ground_profile"
          >Surveyed Ground Profile [CSV]</label
        >
        <input
          type="file"
          class="form-control"
          name="ground_profile"
          accept=".csv"
        />
      </div>
    </div>
  </div>

  <button class="btn btn-primary" type="submit">Submit</button>
</form>


<h2>Results</h2>

