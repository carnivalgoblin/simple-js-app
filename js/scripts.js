let pokemonList = [];

pokemonList = [
{name: "Bulbasaur", height: 7, types: ['grass','poison']},
{name: "Pikachu", height: 2, types: ['electric','speed']},
{name: "Charizard", height: 15, types: ['fire','flying']}
];

for (let i=0; i<3; i++) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")")
    if (pokemonList[i].height > 5) {document.write(" - wow this pokemon is big!"+"<br>")
}else [document.write("<br>")]
}
