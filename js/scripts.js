let pokemonRepository = (function() {
    let pokemonList = [
      {
        name: "Bulbasaur", height: "2", type: "grass"
      },
      {
        name: "Ivysaur", height: "2", type: "grass"
      },
      {
        name: "Venusaur", height: "6", type: "grass"
      },
      {
        name: "Charmander", height: "2", type: "fire"
      },
      {
        name: "Charmelon", height: "3", type: "fire"
      },
      {
        name: "Charizard", height: "5", type: "fire"
      }
    ];
    // Display a list of all of the Pokemon and their height
    function myLoopFunction(poke) {
      document.write('<p>' + poke.name + ' (height:' + poke.height + ');');
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function addListItem(pokemon1) {
    }
  
    pokemonList.forEach(myLoopFunction)
  
    return {
      getAll: getAll,
      add: add
    };
  
  })();
  
  
