const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userData = { email, password };

  // call your backend api to handle login
  const response = await fetch(
    "https://gem-crop-gallery-server.vercel.app/login",
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
      text: "You successfully login",
      icon: "success",
    });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Login failed. User not found. Signup fast",
    });
  }
});
