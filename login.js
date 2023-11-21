const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userData = { email, password };

  // call your backend api to handle login
  const response = await fetch("http://localhost:5100/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    Swal.fire({
      title: "Welcome",
      text: "You successfully login",
      icon: "success",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Login failed. User not found. Signup fast",
    });
  }
});
