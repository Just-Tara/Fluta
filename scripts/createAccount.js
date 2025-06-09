export function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const token = response.credential;
    
    window.location.href = "../home.html"
  }

  window.handleCredentialResponse = handleCredentialResponse;

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateFormData(firstName, lastName, emailAddress, password1, password2) {
  if (!firstName || !lastName || !emailAddress || !password1 || !password2) {
    alert("Please fill all fields");
    return false;
  } else if (password1 !== password2) {
    alert('Passwords do not match. Please recheck');
    return false;
  } else if (!validateEmail(emailAddress)) {
    alert('Invalid email address');
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const createBtn = document.getElementById('createAccount');
  if (createBtn) {
    createBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const emailAddress = document.getElementById('emailAddress').value.trim();
      const password1 = document.getElementById('Password1').value.trim();
      const password2 = document.getElementById('Password2').value.trim();

      if (!validateFormData(firstName, lastName, emailAddress, password1, password2)) {
        return;
      }

      try {
        const hashedPassword = await hashPassword(password1);
        const userData = {
          firstName,
          lastName,
          emailAddress,
          password1: hashedPassword,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        alert('Account created successfully!');
        window.location.href = "../home.html";
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating your account. Please try again.');
      }
    });
  }
});
