//Requests 12 users from randomuser.me and adds elements to page with results


//randomPersonInfo is variable that will hold result of JSON request
var randomPersonInfo;


//set up variables for DOM elements
const galleryDiv = document.getElementById("gallery");

const bodyElement = document.querySelector("body");





//set up the parameter of the modal window
//data not added until a card is clicked on

let modalContainerDiv = document.createElement("DIV");

modalContainerDiv.style.display = "none";

let modalCloseButton = document.createElement("BUTTON");

modalContainerDiv.classList.add("modal-container");

    bodyElement.appendChild(modalContainerDiv);

    const modalDiv = document.createElement("DIV");

    modalDiv.classList.add("modal");

    modalContainerDiv.appendChild(modalDiv);

    //modalCloseButton = document.createElement("button");

    modalCloseButton.setAttribute("type", "button");

    modalCloseButton.id = "modal-close-btn";

    modalCloseButton.classList.add("modal-close-btn");

    modalDiv.appendChild(modalCloseButton);

    const XStrongElement = document.createElement("STRONG");

    XStrongElement.innerText = "X";

    modalCloseButton.appendChild(XStrongElement);

    const modalInfoContainer = document.createElement("DIV");

    modalInfoContainer.classList.add("modal-info-container");
    
    modalDiv.appendChild(modalInfoContainer);

    const modalImage = document.createElement("IMG");

    modalImage.classList.add("modal-img");

    modalImage.setAttribute("alt", "profile picture");

    modalInfoContainer.appendChild(modalImage);

    const modalNameH3Element = document.createElement("H3");

    modalNameH3Element.id = "name";

    modalNameH3Element.classList.add("modal-name", "cap");

    modalInfoContainer.appendChild(modalNameH3Element);

    const modalEmailPElement = document.createElement("P");

    modalEmailPElement.classList.add("modal-text");

    modalInfoContainer.appendChild(modalEmailPElement);

    const modalCityPElement = document.createElement("P");

    modalCityPElement.classList.add("modal-text", "cap");

    modalInfoContainer.appendChild(modalCityPElement);

    const modalHrTag = document.createElement("HR");

    modalInfoContainer.appendChild(modalHrTag);

    const modalPhonePElement = document.createElement("P");

    modalPhonePElement.classList.add("modal-text");

    modalInfoContainer.appendChild(modalPhonePElement);

    const modalAddressPElement = document.createElement("P");

    modalAddressPElement.classList.add("modal-text");

    modalInfoContainer.appendChild(modalAddressPElement);

    const modalBirthdayPElement = document.createElement("P");

    modalBirthdayPElement.classList.add("modal-text");

    modalInfoContainer.appendChild(modalBirthdayPElement);







//http request for data for 12 people
  var request = new XMLHttpRequest();

  request.open('GET', 'https://randomuser.me/api/?results=12&nat=us');

  request.onreadystatechange = function () {

  if(request.readyState === 4 && request.status === 200) {

    randomPersonInfo = JSON.parse(request.responseText);

    console.log(randomPersonInfo);


    //loop sets up a gallery card for each person
    for (i=0; i<randomPersonInfo.results.length; i++)
    {
    
      const cardDiv = document.createElement("DIV");

      cardDiv.classList.add("card");

      cardDiv.setAttribute("data-index", i.toString())

      galleryDiv.appendChild(cardDiv);

      const cardImgContainerDiv = document.createElement("DIV");

      cardImgContainerDiv.classList.add("card-img-container");

      cardDiv.appendChild(cardImgContainerDiv);

      const image = document.createElement("IMG");

      image.classList.add("card-img");

      image.setAttribute("src", randomPersonInfo.results[i].picture.large);

      image.setAttribute("alt", "profile picture");

      cardImgContainerDiv.appendChild(image);

      const cardInfoContainerDiv = document.createElement("DIV");

      cardInfoContainerDiv.classList.add("card-info-container");

      cardDiv.appendChild(cardInfoContainerDiv);

      const nameH3Element = document.createElement("H3");

      nameH3Element.setAttribute("id", "name");

      nameH3Element.classList.add("card-name", "cap");

      nameH3Element.innerText = randomPersonInfo.results[i].name.first + " " + randomPersonInfo.results[i].name.last;

      cardInfoContainerDiv.appendChild(nameH3Element);

      const emailPElement = document.createElement("P");

      emailPElement.classList.add("card-text");

      emailPElement.innerText = randomPersonInfo.results[i].email;

      cardInfoContainerDiv.appendChild(emailPElement);

      const cityPElement = document.createElement("P");

      cityPElement.classList.add("card-text", "cap");

      cityPElement.innerText = randomPersonInfo.results[i].location.city + ", " + randomPersonInfo.results[i].location.state

      cardInfoContainerDiv.appendChild(cityPElement);

    }

  }
};

request.send();



//populates the modal window with data based on which card was clicked on and displays the modal window
galleryDiv.addEventListener('click', (event) => {


  var element = event.target;

  //if the user clicked somewhere inside a card
  if(element !== galleryDiv)
  {

  
  //get the card that was clicked on (the target may have been another element) and work from there
    while(element.parentElement !== galleryDiv)
    {
        element = element.parentElement;
    }

    const cardElement = element;

    const i = parseInt(cardElement.getAttribute("data-index"));

    modalImage.setAttribute("src", randomPersonInfo.results[i].picture.large)

    modalNameH3Element.innerText = randomPersonInfo.results[i].name.first + " " + randomPersonInfo.results[i].name.last;

    modalEmailPElement.innerText = randomPersonInfo.results[i].email;

    const city = randomPersonInfo.results[i].location.city

    modalCityPElement.innerText = city;
  
    modalPhonePElement.innerText = randomPersonInfo.results[i].cell;

    const houseNumber = randomPersonInfo.results[i].location.street.number;

    const street = randomPersonInfo.results[i].location.street.name;

    const state = randomPersonInfo.results[i].location.state;

    const zip = randomPersonInfo.results[i].location.postcode;

    modalAddressPElement.innerText = houseNumber + " " + street + ", " + city + ", " + state + " " + zip;

    const birthdate = new Date(Date.parse(randomPersonInfo.results[i].dob.date));

    const year = birthdate.getFullYear();

    const month = birthdate.getMonth();

    const day = birthdate.getDate();

    const birthday = month + "/" + day + "/" + year;

    modalBirthdayPElement.innerText = "Birthday: " + birthday;

    modalContainerDiv.style.display = "block";

}

});



//hides the modal window when user clicks on the modal close button
modalCloseButton.addEventListener('click', (event) => {

  modalContainerDiv.style.display = "none";

});