let pokemonRepository = (function () {
//let pokemonList = [
//        {       name: 'Ivysaur',
//                height: 1,
//                weight: 13,
//                types: ['grass', 'poison']
//        },

//        {       name: 'Blastoise',
//                height: 1.6,
//                weight: 85.5,
//                types: ['water']
//        },

//        {       name: 'Girafarig',
//                height: 1.5,
//                weight: 41.5,
//                types: ['psychic', 'normal']
//        },
//];

let pokemonList = [];

let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
  button.addEventListener('click', function (event) {
    let target = event.target;
    console.log(pokemon);
  })
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function() {
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
  })
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails
};
})();

const modalContainer = document.querySelector('Modal');

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu", type: ['electric'], height: 0.3});
console.log(pokemonRepository.getAll());

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
