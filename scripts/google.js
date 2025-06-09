export function initGoogleSignIn(clientId, onSuccessCallback) {
  window.addEventListener('load', () => {
    if (typeof google === 'undefined') {
      console.error("Google script not loaded");
      return;
    }

    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.credential) {
          const userData = parseJwt(response.credential);
          console.log("Google User:", userData);
          onSuccessCallback(userData);
        } else {
          console.error("Google Sign-In failed.");
        }
      },
    });

    const btn = document.getElementById("customGoogleBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        google.accounts.id.prompt();
      });
    } else {
      console.warn("Google Sign-In button not found.");
    }
  });

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''));
    return JSON.parse(jsonPayload);
  }
}