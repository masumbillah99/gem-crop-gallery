const dropImgSec = document.getElementById("drop-img-sec");

function redirectToPage(url) {
  window.location.href = url;
}

// check & redirect
function checkAndRedirect() {
  if (isLoggedIn()) {
    console.log("upload");
  } else {
    window.location.href = "/login";
  }
}

// check if the user is logged in
const isLoggedIn = async () => {
  const res = await fetch("http://localhost:5100/user");
  const data = await res.json();
  console.log(data);
};

const logoutBtn = () => {
  console.log("logout btn");
};

// load spinner function
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loading-spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

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

  cropButton.addEventListener("click", function () {
    const croppedData = cropper.getCroppedCanvas().toDataURL("image/jpeg");
    sendCroppedData(croppedData);
  });

  function sendCroppedData(croppedData) {
    fetch("http://localhost:5100/upload-img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ croppedData }),
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
