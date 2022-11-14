let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Add pokemon to pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
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
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-class");

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon)

    button.addEventListener("click", () => {
      showDetails(pokemon);
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

  let modal = document.querySelector('#modal');
  let modalTitle = document.querySelector('#modal-title');
  let modalBody = document.querySelector('#modal-body');
  let modalHeader = document.querySelector('#modal-header');
  let overlay = document.querySelector('#overlay');


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      // console.log(item);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    modalTitle.innerText = pokemon.name;
    modalBody.innerText = '';

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-img');
    pokemonImage.alt = 'A front image of the choosen pokemon';
    pokemonImage.src = pokemon.imageUrl || 'img/pokemon.png';

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = `Height: ${pokemon.height || '?'}`;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = `Weight: ${pokemon.weight || '?'}`;

    let closeButtonElement = document.createElement('button');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    modal.classList.add('is-visible');
    overlay.classList.add('is-visible');

    modalHeader.appendChild(closeButtonElement);

    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
  }

  function hideModal() {
    modal.classList.remove('is-visible');
    overlay.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
      hideModal();
    };
  });


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

// console.log(pokemonRepository.getAll());


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});