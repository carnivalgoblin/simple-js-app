/* INITIALIZE POKEMON REPO WITH IIFE AND ADD/GETALL FUNCTIONS */

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');


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
        button.setAttribute('id', 'show-modal');
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
            showModal(pokemon);
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

    /* EVENT LISTENER FOR ESCAPE TO CLOSE MODAL */
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    /* EVENT LISTENER FOR CLICK OUTSIDE OF MODAL TO CLOSE */
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    /* MODALSHOW FUNCTION */
    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        /* CREATE DIV FOR MODAL AND ASSIGN CLASS */
        let modal = document.createElement('div');
        modal.classList.add('modal');

        /* DEFINE CLOSE BUTTON */
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        /* DEFINE CONTENT FOR MODAL */
        let titleElement = document.createElement('H1');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Heigth: ' + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ' + pokemon.weight;

        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;

        /* APPEND CONTENT INTO MODAL */
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modalContainer.appendChild(modal);

        /* MAKE MODAL VISIBLE */
        modalContainer.classList.add('is-visible');
    }

    /* HIDE MODAL */
    function hideModal() {
        modalContainer.classList.remove('is-visible');
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
