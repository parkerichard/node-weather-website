
const weatherForm = document.querySelector('form')
const latitude = document.querySelector('.lat')
const longitude = document.querySelector('.lng')
const errorMessage = document.querySelector('#error-message')
const dataMessage = document.querySelector('#data-message')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    errorMessage.textContent = ''
    dataMessage.textContent = 'Loading...' 

    fetch('http://localhost:3000/weather?latitude='+ latitude.value + '&longitude=' + longitude.value).then((response)=>{
        response.json().then((data) => {
        if(data.error) {
            dataMessage.textContent = data.error
        } else {
            dataMessage.textContent = data.forecast
        }
        })
    })
})