let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  // Return pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Create button for each added pokemon
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {

      let list = $('<div class="list-group-item col-sm-3"></div>');

      let card = $('<div class="card""></div>');

      let image = $('<img class="card-front">');
      image.attr("src", pokemon.frontimageUrl);
      image.alt = 'A front image of the choosen pokemon';
      
      let cardBody = $('<div class="card-body"></div>');
      let button = $('<button class="btn btn-primary" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');
      
      list.append(card);
      pokemonListElement.append(list);
      card.append(cardBody);
      card.append(image);
      cardBody.append(button);
      
      button.on('click', function(event) {
        showDetails(pokemon)
      });
    });    
  }


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }


  // Fetch pokemon list from API
  function loadList() {
    return $.ajax(apiUrl)
    .then(function(json) {
      json.results.forEach(function (item) {
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

  
  // Fetch detailed information of pokemon from API, returning as an object
  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url)
    .then(function (details) {
      
      item.frontimageUrl = details.sprites.front_default;
      item.backimageUrl = details.sprites.back_default;
      
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
       }).catch(function(e) {
      console.error(e);
    });
  }


  function showModal(item) {
    
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.text(item.name);

    let frontImage = $('<img class="modal-front" style="width:40%">');
    frontImage.attr("src", item.frontimageUrl);
    frontImage.alt = 'A front image of the choosen pokemon';

    let imageBack = $('<img class="modal-back" style="width:40%">');
    imageBack.attr("src", item.backimageUrl);
    imageBack.alt = 'A back image of the choosen pokemon';
      
    let itemHeight = document.createElement('p');
    itemHeight.innerText = `Height: ${item.height || '?'}`;

    let itemWeight = document.createElement('p');
    itemWeight.innerText = `Weight: ${item.weight || '?'}`;

    let itemAbilities = document.createElement('p');
    itemAbilities.innerText = `Abilities: ${item.abilities || '?'}`;

    modalBody.append(frontImage);
    modalBody.append(imageBack);
    modalBody.append(itemHeight);
    modalBody.append(itemWeight);
    modalBody.append(itemAbilities);
  };


  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails,
    
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});