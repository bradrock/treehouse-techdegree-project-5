//Requests 12 users from randomuser.me and adds elements to page with results


  var request = new XMLHttpRequest();

  request.open('GET', 'https://randomuser.me/api/?results=12');

  request.onreadystatechange = function () {

  if(request.readyState === 4 && request.status === 200) {



    var randomPersonInfo = JSON.parse(request.responseText);

    console.log(randomPersonInfo);

    

    for (i=0; i<randomPersonInfo.results.length; i++)
    {
    
      const cardDiv = document.createElement("DIV");

      cardDiv.classList.add("card");

      document.getElementById("gallery").appendChild(cardDiv);

      const cardImgContainerDiv = document.createElement("DIV");

      cardImgContainerDiv.classList.add("card-img-container");

      cardDiv.appendChild(cardImgContainerDiv);

      const image = document.createElement("IMG");

      image.classList.add("card-img");

      image.setAttribute("src", randomPersonInfo.results[i].picture.large);

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

