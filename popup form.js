const modal = document.getElementById('registerModal');
const openBtn = document.getElementById('open-register');
const closeBtn = document.querySelector('.close');
const registerBtn = document.getElementById('register-button')

//open up pop-up form when you click register here
openBtn.addEventListener('click', function(event) {
    event.preventDefault(); //makes sure the fake link we made doesn't jump to the top
    modal.style.display = 'block';
})

//close the popup when we press the x
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

//closes the popup when we click outside the popup box
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//confirmation message/alert to joining zoomzy when pressing the register button
registerBtn.addEventListener('click', function(event) {
alert("Welcome to the ZoomZy family! :) \n Check your email for confirmation.")

});