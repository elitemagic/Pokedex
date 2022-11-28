let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

  let pokemonListElement = $('.pokemon-list');

  // Add pokemon to pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct');
    }
  }

  // Fetch pokemon list from API
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        // console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // Return pokemonList array
  function getAll() {
    return pokemonList;
  }



  // Create button for each added pokemon
  function addListItem(pokemon) {

    let button = $('<button class="btn btn-primary" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');
    let listPokey = $('<li class="list-group-item"></li>');

    listPokey.append(button);
    pokemonListElement.append(listPokey);

    button.on('click', function(event) {
      showDetails(pokemon)
    });
    
  }

  // Fetch detailed information of pokemon from API, returning as an object
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      // console.log(item);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.text(pokemon.name);

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-img');
    pokemonImage.alt = 'A front image of the choosen pokemon';
    pokemonImage.src = pokemon.imageUrl || 'img/pokemon.png';

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = `Height: ${pokemon.height || '?'}`;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = `Weight: ${pokemon.weight || '?'}`;

    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
  };

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});