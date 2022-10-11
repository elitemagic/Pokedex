let pokemonList=[
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
  
// Display a list of all of the Pokemon and their height, commenting 'Wow' with pokemon over 5 in height
for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height >5 ){
      document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + "); Wow, thats big!");
    }
    else {
      document.write("<p>" + pokemonList[i].name + " " + "(height:" + pokemonList[i].height + ");");
    }
  }
