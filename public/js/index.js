console.log('This is an cliend side JS file.');

//select fields
const weatherForm = document.querySelector('form');
const weatherLocation = document.querySelector('.weather_location');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//handle weather fetching
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //prepare UI for rendering information
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    const location = weatherLocation.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((data) => {
        data.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return;
            }

            const {forecast, location, address} = data;
            
            messageOne.textContent = forecast;
            messageTwo.textContent = location;
        })
    });
});