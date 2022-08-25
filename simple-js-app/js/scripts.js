let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//let modalContainer = document.querySelector('modal-container');
let searchField = document.querySelector('#pokedex-search');

function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

function getAll() {
  return pokemonList;
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.list-group-horizontal');
  let listItem = document.createElement('li');
  pokemonList.classList.add("group-list-item");
  pokemonList.classList.add('col-sml-4', 'col-md-6', 'col-lg-12');
  let buttonItem = document.createElement('button');
  buttonItem.classList.add("pokemonButton");
  buttonItem.innerText = pokemon.name;
  buttonItem.setAttribute("data-toggle", "modal");
  buttonItem.setAttribute("data-target", "#pokemon-modal");
  $(buttonItem).addClass('button-class btn-block btn m1');
  listItem.appendChild(buttonItem);
  pokemonList.appendChild(listItem);
  buttonItem.addEventListener('click', function () {
    showDetails(pokemon);
  })
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon);
    //console.log(pokemon);
  });
}

function loadList () {
  return fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
  return fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = details.types.map(type => type.type.name).join(',');
    item.abilities = details.abilities
      .map(ability => ability.ability.name)
      .join(',');
  })
  .catch(function (e) {
    console.error(e);
  });
}

function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $("modal-title");

  modalTitle.empty();
  modalBody.empty();


  let nameElement = $('<h1>' + pokemon.name + '</h1>');
  let imageElement = $('<img class="pokemon-img" style="width:50%">');
  imageElement.attr("src", pokemon.imageUrl);
  let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
  let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
  let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
  let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
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

searchField.addEventListener('input', function() {
  let pokelist = document.querySelectorAll('pokemonButton');
  let filterValue = searchField.value.toUpperCase();

  pokeList.forEach(function(pokemon) {
    console.log(pokemon.innerText);
    if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
      pokemon.style.display = '';
    }else {
      pokemon.style.display = 'none';
    }
  });
});

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
