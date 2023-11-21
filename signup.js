const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  const userData = { username, email, password };

  if (password !== confirmPassword) {
    alert("your password does not match");
    return;
  }

  // call your backend api to handle signup
  const response = await fetch(
    "https://gem-crop-gallery-server.vercel.app/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (response.ok) {
    window.localStorage.setItem("gem-crop-gallery", email);
    Swal.fire({
      title: "Welcome",
      text: "You successfully sign up",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "sign up failed. Please try again!",
    });
  }
});
