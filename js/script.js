//Requests 12 users from randomuser.me and adds elements to page with results


//randomPersonInfo is variable that will hold result of JSON request
var randomPersonInfo;

const galleryPopulation = 12;


//set up variables for DOM elements
const galleryDiv = document.getElementById("gallery");

const bodyElement = document.querySelector("body");

const searchContainerDiv = document.querySelector("div.search-container");






//set up the parameters of the modal window
//data not added until a card is clicked on

let modalContainerDiv = document.createElement("DIV");

modalContainerDiv.style.display = "none";

let modalCloseButton = document.createElement("BUTTON");

modalContainerDiv.classList.add("modal-container");

bodyElement.appendChild(modalContainerDiv);

const modalDiv = document.createElement("DIV");

modalDiv.classList.add("modal");

modalContainerDiv.appendChild(modalDiv);

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

const modalButtonContainer = document.createElement("DIV");

modalButtonContainer.classList.add("modal-btn-container");

modalContainerDiv.appendChild(modalButtonContainer);

const modalPrevButton = document.createElement("BUTTON");

modalPrevButton.id = "modal-prev";

modalPrevButton.classList.add("modal-prev", "btn");

modalPrevButton.innerText = "Prev";

modalButtonContainer.appendChild(modalPrevButton);

const modalNextButton = document.createElement("BUTTON");

modalNextButton.id = "modal-next";

modalNextButton.classList.add("modal-next", "btn");

modalNextButton.innerText = "Next";

modalButtonContainer.appendChild(modalNextButton);





//set up the search form
const searchForm = document.createElement("FORM");

searchForm.setAttribute("action", "#");

searchForm.setAttribute("method", "get");

searchContainerDiv.appendChild(searchForm);


const searchInputField = document.createElement("INPUT");

searchInputField.setAttribute("type", "search");

searchInputField.setAttribute("placeholder", "Search...");

searchInputField.id = "search-input";

searchInputField.classList.add("search-input");

searchForm.appendChild(searchInputField);


const searchSubmit = document.createElement("INPUT");

searchSubmit.setAttribute("type", "submit");

searchSubmit.setAttribute("value", '\ud83d\udd0d');

searchSubmit.id = "search-submit";

searchSubmit.classList.add("search-submit");

searchForm.appendChild(searchSubmit);






//http request for data for 12 people
var request = new XMLHttpRequest();

  
request.open('GET', 'https://randomuser.me/api/?results=' + galleryPopulation + '&nat=us');

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

        nameH3Element.id = randomPersonInfo.results[i].name.first + "-" + randomPersonInfo.results[i].name.last;

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

    displayModalWindow(i);

}

});



//displays the modal window based on a given index (i) of the person in the gallery
function displayModalWindow(i)
{
  
  modalContainerDiv.setAttribute("data-index", i.toString());
  
  modalImage.setAttribute("src", randomPersonInfo.results[i].picture.large);

    
  modalNameH3Element.id = randomPersonInfo.results[i].name.first + "-" + randomPersonInfo.results[i].name.last;

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


//event listener for the modal previous button--displays the modal window for the previous index gallery member
modalPrevButton.addEventListener('click', () => {

  const currentIndex = parseInt(modalContainerDiv.getAttribute("data-index"));

  if (currentIndex !== 0)
  {
    const newIndex = currentIndex - 1;

    displayModalWindow(newIndex);

  }
  

});


//event listener for the modal previous button--displays the modal window for the next index gallery member
modalNextButton.addEventListener('click', () => {

  const currentIndex = parseInt(modalContainerDiv.getAttribute("data-index"));

  if (currentIndex !== galleryPopulation - 1)
  {
    const newIndex = currentIndex + 1;

    displayModalWindow(newIndex);

  }
  

});


//hides the modal window when user clicks on the modal close button
modalCloseButton.addEventListener('click', (event) => {

  modalContainerDiv.style.display = "none";

});





//execute the search if the search button is clicked
searchSubmit.addEventListener('click', () => {
  
  const inputText = searchInputField.value;

  executeSearch(inputText);

});


//execute the search if there is a keyup event in the input field
searchInputField.addEventListener('keyup', () => {

  const inputText = searchInputField.value;

  executeSearch(inputText);

});


/*
  executes search by assigning match class to cards based on search terms
  and shows/hides cards accordingly
*/
function executeSearch(searchText)
{

  assignMatchClassToCards(searchText);

  const matchCol = getMatchCollection();

  const nonMatchCol = getNonMatchCollection();

      for (i = 0; i < nonMatchCol.length; i++)
      {
            nonMatchCol[i].style.display = "none";
      }

      for (i = 0; i < matchCol.length; i++)
      {
            matchCol[i].style.display = "flex";
      }

}





//assigns the "match" class to cards based on a search string
function assignMatchClassToCards(searchString)
{
   for (i = 0; i < galleryDiv.children.length; i++)
   {

      //first reset by removing all match class assignments
      galleryDiv.children[i].classList.remove("match");
      

      const personName = randomPersonInfo.results[i].name.first + " " + randomPersonInfo.results[i].name.last;


      if((searchString.length > 0 && personName.toLowerCase().includes(searchString.toLowerCase())) || searchString.length == 0)
      {
        galleryDiv.children[i].classList.add("match");
      }

   }

}


//gets the collection of gallery cards with match class
function getMatchCollection()
{
   const matchList = document.querySelectorAll("div.card.match")

   return matchList;
}

//gets the collection of gallery cards without match class
function getNonMatchCollection()
{
   const nonMatchList = document.querySelectorAll("div.card:not(.match)");

   return nonMatchList;
}
