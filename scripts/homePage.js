 const subscribeButtons = document.querySelectorAll('.js-button');

document.querySelectorAll('#subscribeForm').forEach(form => {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = form.querySelector('.email').value.trim();

    if (!email) {
      alert('Please input your email address');
    } else {
      subscribeButtons.forEach(button => {
        button.innerHTML = 'Subscribed';
        button.style.backgroundColor = 'black';
      });
      alert('You have successfully subscribed to Fluta');
    }
  });
});


document.querySelector('.js-logout-button').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");

  window.location.href ="index.html"

});