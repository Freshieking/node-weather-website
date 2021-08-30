
console.log('Client side JS');

// fetch("http://puzzle.mead.io/puzzle").then((response=> {
//     //once data has arrived it will take the response and turn it into a json
//     response.json().then((data) =>{
// //once the data has been turned into a json be called data and it will be logged to the console
//         console.log(data);
//     })
// }))

fetch("http://localhost:3000/weather?address=!").then((response=> {
    response.json().then((data) =>{
        if (data.error) {
            console.log(data.error);
        }else
        console.log(data.Location);
        console.log(data.Forecast);
    })
}))


//assigning the function of the search box to weatherForm so we are able to modify it
const weatherForm = ( document.querySelector('form'))

// assigning the value of the search box to search
const search = document.querySelector('input')

//query selector selects the first instance of the data you wish to select, e.g. above its selecting the first instance of input and form
// to select an ID such as ones in index.hbs the selector must start with #
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
// to modify MessageOne you must do .textContent. This will modify the P values in index
messageOne.textContent ='Enter Location Above to find our the forecast'
messageTwo.textContent =''

// when the form has been submitted using the button we created in index we will proceed with the function below
// "e" is the event object, this is a way to modify the even listener 
weatherForm.addEventListener('submit',(e)=>{
    //prevent default will stop the page from refreshing and removing the data we have logged to the console when we submit our form
    e.preventDefault()

    messageOne.textContent ='Loading...'
    messageTwo.textContent =''


    // .value takes the input of the search box
    if (search.value){
        fetch(`http://localhost:3000/weather?address=${search.value}`).then((response=> {
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent = data.error;
        }else
        messageOne.textContent = (data.Location);
        messageTwo.textContent= (data.Forecast);
    })
}))
    }




    console.log("shutup");
})
console.log(weatherForm);