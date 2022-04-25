/* INITIALIZE POKEMON REPO WITH IIFE AND ADD/GETALL FUNCTIONS */

let pokemonRepository = (function () {
    let pokemonList = [];

    pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
        { name: 'Pikachu', height: 0.2, types: ['electric', 'speed'] },
        { name: 'Charizard', height: 1.5, types: ['fire', 'flying'] }
    ];

    function add(pokemon) {
        if (Object.keys(pokemon).includes('name')) {
            pokemonList.push(pokemon);
        } else {
            return (console.log('Input invalid. ' + pokemon + ' is not a valid input.'),
                document.write('<p>' + 'Input invalid. ' + pokemon + ' is not a valid input.' + '</p>'))
        }

    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

/* CALL REPO */

document.write('<ul class="pokemon-list">');

pokemonRepository.getAll().forEach(function (pokemon) {
    document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ')')
    if (pokemon.height > 1) {
        document.write(' - wow this pokemon is big!' + '</li>' + '<br>')
    } else { document.write('</li>' + '<br>') }
});

document.write('</ul> <br>');

/* DEFINE NEW POKEMON, WRITE TO DOM AND ADD IT TO REPO*/

/* let newPokemon = { name: 'Ditto', height: 0.3, types: ['normal'] };


document.write('<ul class="pokemon-list">');

document.write('Adding new Pokemon:<br><br>');

document.write('<li>' + newPokemon.name + ' (height: ' + newPokemon.height + ')')
if (newPokemon.height > 1) {
    document.write(' - wow this pokemon is big!' + '</li>' + '<br>')
} else { document.write('</li>' + '<br>') };

document.write('</ul> <br><br>');

pokemonRepository.add(newPokemon); */