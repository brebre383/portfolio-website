let pokemonRepository = (function () {

let pokemonList = [];

let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

let modalContainer = document.querySelector('modal-container');

function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener('click', function (){showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
    showModal(pokemon);
    console.log(pokemon);
  });
}

function loadList () {
  return fetch(apiUrl).then(function(response){
    return response.json();
  }).then(function(json){
    json.results.forEach(function(item){
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails (item) {
  let url = item.detailsUrl;
  return fetch(url).then(function(response){
    return response.json();
  }).then (function(details){
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function(e){
    console.error(e);
  });
}

function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $("modal-title");

  let nameElement = $('<h3>' + pokemon.name + '</h3>');
  let imageElement = $('<img class="pokemon-img">');
  imageElement.attr("src", pokemon.imageUrl);
  let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
  let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
  let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(typeElement);
  modalBody.append(abilitiesElement);
}

function hideModal() {
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//
//document.write('<div class="pokemonList">');
//for (let i = 0; i < pokemonList.length; i++) {
    //if (pokemonList[i].height > 1.5) {
    //   document.write('<div class="pokemon--big">');
    //   document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
    //   document.write(' - Wow, that\'s big!');
    //} else {
    //  document.write('<div class="pokemon">');
    //  document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
//  }
  //  document.write('</div>');
//}
 //document.write('</div>');



// Task 1.5
//pokemonlist.forEach(function (pokemon) {
  //if (pokemon.height < 1.4 && pokemon.height > 1.1) {
    //document.write(pokemon.name + " is small/ ");
  //}
//   else if (pokemon.height < 1.5) {
    //document.write(pokemon.name + " is normal/ ");
//  } else { document.write(pokemon.name + " is big, wow!/"); }
// });

//let pokemon1 = 'Ivysaur(Height:1)';
//document.write(pokemon1);
//let pokemon2 = 'Blastoise(height:1.6)';
//document.write(pokemon2);
//let pokemon3 = 'Girafarig(height:1.5)';
//document.write(pokemon3);



//function divide(dividend, divisor){
//  if(divisor === 0){
//    return "you're trying to divide by zero."
//  }else{
//    let result = dividend / divisor;
//    return result;
//  }
//}

//divide();
//console.log(divide(4, 2));
