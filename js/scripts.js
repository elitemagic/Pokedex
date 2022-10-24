let pokemonRepository = (function() {
  let repository = [
    {
      name: "Bulbasaur", height: "2", types: "grass"
    },
    {
      name: "Ivysaur", height: "2", types: "grass"
    },
    {
      name: "Venusaur", height: "6", types: "grass"
    },
    {
      name: "Charmander", height: "2", types: "fire"
    },
    {
      name: "Charmelon", height: "3", types: "fire"
    },
    {
      name: "Charizard", height: "5", types: "fire"
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon 
    ) {
    repository.push(pokemon);
    } else {
    console.log ("Pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon)
    })
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

console.log (pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);  
});



