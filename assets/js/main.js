const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="pokemon">
    <div class="card m-2 ">
      <div class="card-content ${pokemon.type} p-2">
        <div class="card-body">
          <div class="media d-flex">
            <div class="align-self-center">
              <span class=" float-left"><img src="${pokemon.photo}" alt="${pokemon.name}" class="card-img-top pse-2 mt-4"></span>
            </div>
            <div class="media-body text-right text-white ps-2">
              <h1 class="text-capitalize h6">${pokemon.name}</h1>
              <span >#${pokemon.number}</span>
              <div class="types list-group list-group-horizontal">
                ${pokemon.types.map((type) => `<img src="./assets/icon/${type}.svg"
                alt="${type}" class="icone p-1 m-0">`).join('')}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    `
}
/*<div class="card pokemon p-0" >
<img src="${pokemon.photo}"
    alt="${pokemon.name}" class="card-img-top pse-2 mt-4">
    <div class="card-body rounded ">

        <h5 class="card-title text-capitalize ${pokemon.type} name ps-2">${pokemon.name} <class="fw-lighter number">#${pokemon.number}</span></h5>

        <div class=" ${pokemon.type}  ">

            <ol class="types list-group-flush ">
                ${pokemon.types.map((type) => `<li class="list-group-item "><button class="border-0 type ${type} badge rounded-pill">${type}</button></li>`).join('')}
            </ol>

                <p class="card-text">${pokemon.description}</p>

        </div>
    </div>
</div>*/

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})