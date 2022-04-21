let pokemonRepository = (function () {
    let pokemonList = [];

    pokemonList = [
        { name: "Bulbasaur", height: 7, types: ['grass', 'poison'] },
        { name: "Pikachu", height: 2, types: ['electric', 'speed'] },
        { name: "Charizard", height: 15, types: ['fire', 'flying'] }
    ];

    return {
        add: function (item) {
            pokemonList.push(item);
        },
        getAll: function () {
            return pokemonList;
        }

    }
})();

document.write('<ul class="pokemon-list">')

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ')')
    if (pokemon.height > 5) {
        document.write(' - wow this pokemon is big!' + '</li>' + '<br>')
    } else { document.write('</li>' + '<br>') }
});

document.write('</ul>')
