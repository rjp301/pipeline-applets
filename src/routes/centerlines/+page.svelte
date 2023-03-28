<form method="post" class="flex gap-2 flex-col p-4">
  <h1>Add Centerline</h1>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name" placeholder="Centerline Name" />
  </div>

  <div>
    <label for="description">Description</label>
    <input
      type="text"
      name="description"
      id="description"
      placeholder="Centerline Description"
    />
  </div>

  <div>
    <label for="line">Line</label>
    <input type="file" name="line" id="line" />
    <p class="form-caption">GeoJSON file of centerline alignment</p>
  </div>

  <div>
    <label for="markers">Markers</label>
    <input type="file" name="markers" id="markers" />
    <p class="form-caption">GeoJSON file of centerline markers</p>
  </div>

  <div>
    <label for="footprint">Footprint</label>
    <input type="file" name="footprint" id="footprint" />
    <p class="form-caption">GeoJSON file of centerline footprint</p>
  </div>

  <div>
    <button class="btn" type="submit">Submit</button>
    <button class="btn" type="reset">Reset</button>
  </div>
</form>
