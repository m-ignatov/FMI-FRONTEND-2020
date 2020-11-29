function validateEmail(email) {
  return email.length < 5 || !/@.*\./.test(email);
}

function validatePassword(pass) {
  return pass.length < 6 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass) || !/[!@#$%^&]/.test(pass);
}

function validateRegistration(event) {
  document.getElementById("errors").innerText = "";

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (username.length == 0) {
    document.getElementById("errors").innerText = "Username is required.";

  } else if (validateEmail(email)) {
    document.getElementById("errors").innerText = "Invalid email! The email must be at least 5 characters long and contain an '@' and a dot in the domain name.";

  } else if (validatePassword(pass)) {
    document.getElementById("errors").innerText = "Invalid password! The password must be at least six symbols and contain at least capital letter, one number and one special symbol.";
  } else {
    window.auth.register(username, email, pass, (isSuccessfull, errorCode, errorMessage) => {
      if (!isSuccessfull) {
        alert(errorMessage);
      } else {
        let url = window.location.origin + window.location.pathname + "/../posts.html";
        console.log(url);
        window.location.href = url;
      }
    });
  }
  event.preventDefault();
}

function validateLogin(event) {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("pass").value;

  if (validateEmail(email) || validatePassword(pass)) {
    document.getElementById("errors").innerText = "Incorrect email or password.";
  } else {
    window.auth.login(email, pass, (isSuccessfull, errorCode, errorMessage) => {
      if (!isSuccessfull) {
        alert(errorMessage);
      } else {
        let url = window.location.origin + window.location.pathname + "/../posts.html";
        console.log(url);
        window.location.href = url;
      }
    });
  }
  event.preventDefault();
}