/* INITIALIZE POKEMON REPO WITH IIFE AND ADD/GETALL FUNCTIONS */

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        ulList.classList.add('list-group', 'grid');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'grid__item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-outline-primary', 'btn-lg');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modalContainer');

        /* APPEND TO LISTEITEM AND ULLIST */
        listItem.appendChild(button);
        ulList.appendChild(listItem);

        /* ADD EVENTLISTENER ON BUTTON */
        button.addEventListener('click', function () {
            showDetails(pokemon)
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
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    /* FUNCTION TO REVEAL MORE DETAILS */
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    /* MODALSHOW FUNCTION */
    function showModal(pokemon) {

        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Heigth: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + pokemon.weight;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;

        /* APPEND CONTENT INTO MODAL */
        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
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
