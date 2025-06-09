import { hashPassword, handleCredentialResponse } from './createAccount.js';

 window.handleCredentialResponse = handleCredentialResponse;

  const loginBtn = document.getElementById('loginPage');
  if (loginBtn) {
    loginBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      try {
        const emailAddress = document.getElementById('emailAddress').value.trim();
        const password = document.getElementById('password').value;
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (!emailAddress || !password) {
          alert('Please fill all fields.');
          return;
        }
        if (!storedData) {
          alert('No account found. Please sign up first');
          return;
        }
        if (emailAddress !== storedData.emailAddress) {
          alert('Email not found');
          return;
        }
        const hashedInputPassword = await hashPassword(password);
        if (hashedInputPassword === storedData.password1) {
          alert('Login successful');
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "../home.html";
        } else {
          alert('Incorrect password');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
        console.error(error);
      }
    });
  }
