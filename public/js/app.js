console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);

                messageOnetextContent = data.error;
            }else {
                console.log(data.location);
                console.log(data.forecast);

                messageOne.textContent = data.location;
                messageTwo.textContent = JSON.stringify(data.forecast);
            }
        });
    });
});