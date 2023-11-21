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
  const response = await fetch("http://localhost:5100/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    Swal.fire({
      title: "Welcome",
      text: "You successfully sign up",
      icon: "success",
    });
    window.location.href = "/";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "sign up failed. Please try again!",
    });
  }
});
