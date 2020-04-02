//Requests 12 users from randomuser.me and adds elements to page with the results


//randomPersonInfo is variable that will hold result of JSON request
var randomPersonInfo;

const galleryPopulation = 12;


//set up variables for DOM elements
const galleryDiv = document.getElementById("gallery");

const bodyElement = document.querySelector("body");

const searchContainerDiv = document.querySelector("div.search-container");




setUpGallery();




//set up the parameters of the modal window
//data not added until a gallery card is clicked on
  let modalContainerDiv = createAppend("DIV", bodyElement);

  modalContainerDiv.style.display = "none";

  modalContainerDiv.classList.add("modal-container");




  const modalDiv = createAppend("DIV", modalContainerDiv);

  modalDiv.classList.add("modal");




  let modalCloseButton = createAppend("BUTTON", modalDiv);

  modalCloseButton.setAttribute("type", "button");

  modalCloseButton.id = "modal-close-btn";

  modalCloseButton.classList.add("modal-close-btn");




  const XStrongElement = createAppend("STRONG", modalCloseButton);

  XStrongElement.innerText = "X";




  const modalInfoContainer = createAppend("DIV", modalDiv);

  modalInfoContainer.classList.add("modal-info-container");





  const modalImage = createAppend("IMG", modalInfoContainer);

  modalImage.classList.add("modal-img");

  modalImage.setAttribute("alt", "profile picture");




  const modalNameH3Element = createAppend("H3", modalInfoContainer);

  modalNameH3Element.classList.add("modal-name", "cap");




  const modalEmailPElement = createAppend("P", modalInfoContainer);

  modalEmailPElement.classList.add("modal-text");




  const modalCityPElement = createAppend("P", modalInfoContainer);

  modalCityPElement.classList.add("modal-text", "cap");



  const modalHrTag = createAppend("HR", modalInfoContainer);




  const modalPhonePElement = createAppend("P", modalInfoContainer);

  modalPhonePElement.classList.add("modal-text");




  const modalAddressPElement = createAppend("P", modalInfoContainer);

  modalAddressPElement.classList.add("modal-text");



  const modalBirthdayPElement = createAppend("P", modalInfoContainer);

  modalBirthdayPElement.classList.add("modal-text");



  const modalButtonContainer = createAppend("DIV", modalContainerDiv);

  modalButtonContainer.classList.add("modal-btn-container");




  const modalPrevButton = createAppend("BUTTON", modalButtonContainer);

  modalPrevButton.id = "modal-prev";

  modalPrevButton.classList.add("modal-prev", "btn");

  modalPrevButton.innerText = "Prev";




  const modalNextButton = createAppend("BUTTON", modalButtonContainer);

  modalNextButton.id = "modal-next";

  modalNextButton.classList.add("modal-next", "btn");

  modalNextButton.innerText = "Next";








//set up the search form

  const searchForm = createAppend("FORM", searchContainerDiv);

  searchForm.setAttribute("action", "#");

  searchForm.setAttribute("method", "get");




  const searchInputField = createAppend("INPUT", searchForm);

  searchInputField.setAttribute("type", "search");

  searchInputField.setAttribute("placeholder", "Search...");

  searchInputField.id = "search-input";

  searchInputField.classList.add("search-input");




  const searchSubmit = createAppend("INPUT", searchForm);

  searchSubmit.setAttribute("type", "submit");

  searchSubmit.setAttribute("value", '\ud83d\udd0d');

  searchSubmit.id = "search-submit";

  searchSubmit.classList.add("search-submit");




//sets up the gallery containing info on employees
function setUpGallery()
{

  //http request for data for 12 people
  var request = new XMLHttpRequest();

    
  request.open('GET', 'https://randomuser.me/api/?results=' + galleryPopulation + '&nat=us');

  request.onreadystatechange = function () {

        if(request.readyState === 4 && request.status === 200) {

        randomPersonInfo = JSON.parse(request.responseText);

     


        
        //loop sets up a gallery card for each person
        for (i=0; i<randomPersonInfo.results.length; i++)
        {

          const cardDiv = createAppend("DIV", galleryDiv);

          cardDiv.classList.add("card");

          cardDiv.setAttribute("data-index", i.toString())

          

          const cardImgContainerDiv = createAppend("DIV", cardDiv);

          cardImgContainerDiv.classList.add("card-img-container");

          


          const image = createAppend("IMG", cardImgContainerDiv);

          image.classList.add("card-img");

          image.setAttribute("src", randomPersonInfo.results[i].picture.large);

          image.setAttribute("alt", "profile picture");

          


          const cardInfoContainerDiv = createAppend("DIV", cardDiv);

          cardInfoContainerDiv.classList.add("card-info-container");

          

          const nameH3Element = createAppend("H3", cardInfoContainerDiv);

          nameH3Element.id = randomPersonInfo.results[i].name.first + "-" + randomPersonInfo.results[i].name.last;

          nameH3Element.classList.add("card-name", "cap");

          nameH3Element.innerText = randomPersonInfo.results[i].name.first + " " + randomPersonInfo.results[i].name.last;

          

          const emailPElement = createAppend("P", cardInfoContainerDiv);

          emailPElement.classList.add("card-text");

          emailPElement.innerText = randomPersonInfo.results[i].email;

          

          const cityPElement = createAppend("P", cardInfoContainerDiv);

          cityPElement.classList.add("card-text", "cap");

          cityPElement.innerText = randomPersonInfo.results[i].location.city + ", " + randomPersonInfo.results[i].location.state

          

      }

    }
  };

  request.send();

}

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


//creates HTML element of type specified by tag (string) and appends it to parent (HTMLElement)
function createAppend(tag, parent)
{
  const element = document.createElement(tag);

  parent.appendChild(element);

  return element;

}



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
