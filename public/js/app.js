const weatherForm = document.querySelector('form')
const address = document.querySelector('.loc')
const errorMessage = document.querySelector('#error-message')
const dataMessage = document.querySelector('#data-message')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    errorMessage.textContent = ''
    dataMessage.textContent = 'Loading...' 

    fetch('/weather?query='+ address.value).then((response)=>{
        response.json().then((data) => {
        if(data.error) {
            dataMessage.textContent = data.error
        } else {
            dataMessage.textContent = data.forecast
        }
        })
    })
})