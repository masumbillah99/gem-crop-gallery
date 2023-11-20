const dropImgSec = document.getElementById("drop-img-sec");

dropImgSec.addEventListener("click", () => {
  console.log("click");
});

function redirectToPage(url) {
  window.location.href = url;
}

// check & redirect
function checkAndRedirect() {
  if (isLoggedIn()) {
    console.log("upload");
  } else {
    alert("please log in to upload images");
    window.location.href = "login.html";
  }
}

// Function to check if the user is logged in
function isLoggedIn() {
  return /* your logic here */;
}
