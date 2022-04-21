let pokemonList = [];

pokemonList = [
    { name: "Bulbasaur", height: 7, types: ['grass', 'poison'] },
    { name: "Pikachu", height: 2, types: ['electric', 'speed'] },
    { name: "Charizard", height: 15, types: ['fire', 'flying'] }
];

/* document.write('<ul class="pokemon-list">')

for (let i = 0; i < pokemonList.length; i++) {
    document.write('<li>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')')
    if (pokemonList[i].height > 5) {
        document.write(' - wow this pokemon is big!' + '</li>' + '<br>')
    } else { document.write('</li>' + '<br>') }
}

document.write('</ul>') */

document.write('<ul class="pokemon-list">')

pokemonList.forEach(function (pokemon) {
    document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ')')
    if (pokemon.height > 5) {
        document.write(' - wow this pokemon is big!' + '</li>' + '<br>')
    } else { document.write('</li>' + '<br>') }
});

document.write('</ul>')
