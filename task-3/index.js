function check_data() {
  if (typeof Storage !== "undefined") {
    const data = localStorage.getItem("data");
    if (data) {
      let str = "";
      for (let d of JSON.parse(data)) {
        str += `<div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
              <canvas id="compressedCanvas" class="img-fluid rounded-start"style="display: none;"></canvas>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${d.name}</h5>
                  <p class="card-text">
                    ${d.description}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">${d.prise}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>`;
      }
      document.getElementById("main").innerHTML = str;
    }
  }
}
function add_data() {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const prise = document.getElementById("prise");
  const img = document.getElementById("image");
  if (
    name.checkValidity() &&
    description.checkValidity() &&
    prise.checkValidity() &&
    img.checkValidity()
  ) {
    data = {
      name: name,
      description: description,
      prise: prise,
      image: img,
    };
  } else {
    console.log("tost");
    $("#liveToast").toast("show");

    // Hide the toast after 3 seconds (adjust the delay as needed)
    setTimeout(function () {
      $("#liveToast").toast("hide");
    }, 3000);
  }
}
