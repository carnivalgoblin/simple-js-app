/* INITIALIZE POKEMON REPO WITH IIFE AND ADD/GETALL FUNCTIONS */

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /*     pokemonList = [
            { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
            { name: 'Pikachu', height: 0.2, types: ['electric', 'speed'] },
            { name: 'Charizard', height: 1.5, types: ['fire', 'flying'] }
        ];
     */
    /* FUNTION TO ADD POKEMON TO LIST */
    function add(pokemon) {
        if (Object.keys(pokemon).includes('name')) {
            pokemonList.push(pokemon);
        } else {
            return (alert('Input invalid.')
            )
        }
    }

    /* FUNCTION TO DISPLAY POKEMON FROM LIST and CREATE LI FOR EACH POKEMON AS A BUTTON BOX */
    function addListItem(pokemon) {
        let ulList = document.querySelector('.pokemon-list');
        ulList.classList.add('grid');
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid__item')
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-box');

        /* APPEND TO LISTEITEM AND ULLIST */
        listItem.appendChild(button);
        ulList.appendChild(gridItem);
        gridItem.appendChild(listItem);


        /* ADD EVENTLISTENER ON BUTTON */
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }

    /* FUNCTION TO REVEAL MORE DETAILS */
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    /* RETURN ALL POKEMON */
    function getAll() {
        return pokemonList;
    }

    /* LOAD LIST */
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    /* LOAD DETAILS */
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList
    };
})();

/* CALL ADDLISTITEM FOR ALL POKEMON IN LIST */
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
