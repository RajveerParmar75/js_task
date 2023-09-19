let item = [];
function check_data() {
  if (typeof Storage !== "undefined") {
    const data = localStorage.getItem("data");
    if (data) {
      let str = "";
      item = JSON.parse(localStorage.getItem("data"));
      // for (let d of JSON.parse(data)) {
      //   const canvasId = `compressedCanvas-${d.id}`;
      //   const imgId = `compressedImage-${d.id}`;

      //   // Create the canvas element and image element in the HTML string
      //   str += `
      //     <div class="card mb-3" style="max-width: 540px">
      //       <div class="row g-0">
      //         <div class="col-md-4">
      //           <canvas id="${canvasId}" class="img-fluid rounded-start"></canvas>
      //         </div>
      //         <div class="col-md-8">
      //           <div class="card-body">
      //             <h5 class="card-title">${d.name}</h5>
      //             <p class="card-text">${d.description}</p>
      //             <p class="card-text">
      //               <small class="text-muted">${d.prise}</small>
      //             </p>
      //             <div class="row">
      //             <button type="button" class="btn btn-danger col-sm-3" onClick="delete_item(${d.id})">Delete</button>
      //             <button type="button" class="btn btn-warning col-sm-3">Edit</button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>`;
      //   const delete_item = (id) => {
      //     JSON.parse(localStorage.getItem("data"));
      //   };
      //   // Get a reference to the canvas element
      //   const compressedCanvas = document.getElementById(canvasId);

      //   // Create an Image element to load the compressed image
      //   const img = new Image();

      //   img.onload = function () {
      //     // Log to check if the image has loaded
      //     console.log(`Image loaded for ID: ${d.id}`);

      //     // Set canvas dimensions to match the image
      //     compressedCanvas.width = img.width;
      //     compressedCanvas.height = img.height;

      //     // Draw the image onto the canvas
      //     const ctx = compressedCanvas.getContext("2d");
      //     ctx.drawImage(img, 0, 0, img.width, img.height);
      //   };

      //   // Set the image source to the compressed image data stored in localStorage
      //   const imgData = localStorage.getItem(`compressedImage-${d.id}`);
      //   img.src = imgData;

      //   // Log to check if the image source is set correctly
      //   console.log(`Image source set for ID: ${d.id}, Source: ${img.src}`);
      // }

      // After constructing the HTML string, insert it into the "main" element
      for (let index = 0; index < item.length; index++) {
        const d = item[index];
        str += `
        <div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4" id="image">
              <img src="${d.compressedImage}" height=200px width="100%"/>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${d.name}</h5>
                <p class="card-text">${d.description}</p>
                <p class="card-text">
                  <small class="text-muted">${d.prise}</small>
                </p>
                <div class="row">
                <button type="button" class="btn btn-danger col-sm-3" onClick="delete_item(${index})">Delete</button>
                <button type="button" class="btn btn-warning col-sm-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="update_data(${index})">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }
      document.getElementById("main").innerHTML = str;
    }
  }
}
const draw_image = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  for (var i = 0; i < item.length; i++) {
    document.getElementById(i);
    const ctx = canvas.getContext("2d");
    const image = data[i].compressedImage;
    const img = new Image();
    img.src = image;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
  }
};
const delete_item = (index) => {
  item.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(item));
  check_data();
};
const compressImage = (imgFile, callback) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const img = new Image();

    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      if (img.height > img.width) {
        canvas.width = 900;
        canvas.height = 1125;
      } else if (img.height < img.width) {
        canvas.width = 900;
        canvas.height = 506.25;
      } else {
        canvas.width = 300;
        canvas.height = 300;
      }
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          callback(blob);
        },
        "image/jpeg",
        0.5
      );
    };
  });

  reader.readAsDataURL(imgFile);
};
// Your add_data function
// Your add_data function
let global_updateId;
const update_data = (id) => {
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const prise = document.getElementById("prise");
  const item_id = document.getElementById("item_id");
  const imgInput = document.getElementById("image");
  item = JSON.parse(localStorage.getItem("data"));
  const data = JSON.parse(localStorage.getItem("data"))[id];
  item_id.name = id;
  name.value = data.name;
  description.value = data.description;
  prise.value = data.prise;
  global_updateId = id;
};
const add_update_data = () => {
  const name = document.getElementById("name_update");
  const description = document.getElementById("description_update");
  const prise = document.getElementById("prise_update");
  const imgInput = document.getElementById("image_update");
  if (name && description && prise && imgInput.files.length > 0) {
    const imgFile = imgInput.files[0];
    const maxWidth = 800;
    const maxHeight = 800;

    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining the aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to a base64 data URL
        const compressedImageData = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality as needed (0.7 represents 70% quality)

        // Retrieve the current data from localStorage
        const currentData = JSON.parse(localStorage.getItem("data")) || [];

        // Generate a unique ID (you can implement your own logic here)

        // Add the new item to the current data
        currentData[global_updateId] = {
          name: name,
          description: description,
          prise: prise,
          compressedImage: compressedImageData,
        };

        // Store the updated data back in localStorage
        localStorage.setItem("data", JSON.stringify(currentData));
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(imgFile);
    check_data();
  }
};
function add_data() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const prise = document.getElementById("prise").value;
  const item_id = document.getElementById("item_id");
  const imgInput = document.getElementById("image");
  console.log(item_id);
  if (name && description && prise && imgInput.files.length > 0) {
    const imgFile = imgInput.files[0];
    const maxWidth = 800;
    const maxHeight = 800;

    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining the aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to a base64 data URL
        const compressedImageData = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality as needed (0.7 represents 70% quality)

        // Retrieve the current data from localStorage
        const currentData = JSON.parse(localStorage.getItem("data")) || [];

        // Generate a unique ID (you can implement your own logic here)

        // Add the new item to the current data
        if (item_id) {
          currentData[global_updateId] = {
            name: name,
            description: description,
            prise: prise,
            compressedImage: compressedImageData,
          };
        } else {
          currentData.push({
            name: name,
            description: description,
            prise: prise,
            compressedImage: compressedImageData,
          });
        }

        // Store the updated data back in localStorage
        localStorage.setItem("data", JSON.stringify(currentData));
        check_data();
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(imgFile);
  } else {
    console.log("Toast");
    $("#liveToast").toast("show");

    // Hide the toast after 3 seconds (adjust the delay as needed)
    setTimeout(function () {
      $("#liveToast").toast("hide");
    }, 3000);
  }
}
