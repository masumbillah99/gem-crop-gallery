const dropImgSec = document.getElementById("drop-img-sec");

function redirectToPage(url) {
  window.location.href = url;
}

// check & redirect
function checkAndUpload() {
  isLoggedIn();
}

// check if the user is logged in
const isLoggedIn = async () => {
  const fileLabel = document.getElementById("file-label");
  const email = window.localStorage.getItem("gem-crop-gallery");
  if (email === null) {
    fileLabel.classList.add("disabled");
    return;
  }

  const res = await fetch(
    `https://gem-crop-gallery-server.vercel.app/user/${email}`
  );
  const data = await res.json();
  return data;
};

// logout btn
function logout() {
  window.localStorage.removeItem("gem-crop-gallery");
  window.location.reload();
}

// loader

// upload image
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const cropButton = document.getElementById("crop-btn");
  var cropper;

  // fileInput.addEventListener("change", function (event) {
  //   const image = document.getElementById("output-img");
  //   const file = event.target.files[0];
  //   var url = window.URL.createObjectURL(
  //     new Blob([file], { type: "image/jpg" })
  //   );
  //   image.src = url;
  //   var options = { aspectRatio: 1, viewMode: 2 };
  //   cropper = new Cropper(image, options);
  // });

  fileInput.addEventListener("change", function (event) {
    cropButton.classList.add("d-block");
    const image = document.getElementById("output-img");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result;
        const options = { aspectRatio: 1, viewMode: 2 };
        cropper = new Cropper(image, options);
      };
      reader.readAsDataURL(file);
    }
  });

  cropButton.addEventListener("click", async function () {
    const croppedData = cropper.getCroppedCanvas().toDataURL("image/jpeg");
    const userData = await isLoggedIn();
    const { email } = userData;
    sendCroppedData(croppedData, email);
  });

  function sendCroppedData(croppedData, email) {
    const imgData = { croppedData, email };
    fetch("https://gem-crop-gallery-server.vercel.app/upload-img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imgData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Good Job",
            text: "Crop image save successfully",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

// show my save images
async function loadMyImages() {
  const userData = await isLoggedIn();
  const url = `https://gem-crop-gallery-server.vercel.app/my-images?email=${userData?.email}`;
  const res = await fetch(url);
  const images = await res.json();
  displayImages(images);
}

function displayImages(images) {
  const myImagesContainer = document.getElementById("my-images");
  myImagesContainer.innerHTML = "";

  if (images) {
    images?.forEach((img) => {
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("col");
      imageDiv.innerHTML = `<img src="${img.croppedData}" class="w-75 rounded" alt="...">`;
      myImagesContainer.appendChild(imageDiv);
    });
  } else {
    const notFoundContainer = document.getElementById("img-not-found");
    notFoundContainer.innerHTML = "No Image Add";
  }
}

loadMyImages();
