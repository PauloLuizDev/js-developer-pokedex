const pokemonList = document.getElementById('pokemonList')
const modal = document.getElementById('modalDetalhes')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <div class="pokemon">
    <div class="card m-2">
      <button class="card-content ${pokemon.type}   border-0"  href="#" class="d-inline" data-bs-toggle="modal" data-bs-target="#${pokemon.name}">
        <div class="card-body">
          <div class="media d-flex">
            <div class="align-self-center">
              <span class=" float-left"><img src="${pokemon.photo}" alt="${pokemon.name}" class="card-img-top"></span>
            </div>
            <div class="media-body text-white ps-2 container-fluid">
              <h2 class="text-capitalize h6 ">${pokemon.name} </h2>
              <span >#${pokemon.number}</span>
              <div class="">
                ${pokemon.types.map((type) => `<img src="./assets/icon/${type}.svg"
                alt="${type}" class="icone p-1 m-0">`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
      </button>
    </div>
  </div>


    `
}

function  convertPokemonToDetails(pokemon){
  return `
  <div class="modal fade" id="${pokemon.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="card-content ${pokemon.type} p-2">
      <div class="modal-content">
        <div class="modal-header">
          <div class="">
          <h2 class="text-capitalize h6 pt-5">${pokemon.name}</h2>
          ${pokemon.types.map((type) => `<img src="./assets/icon/${type}.svg"
          alt="${type}" class="icone p-1 m-0 rounded-circle ${pokemon.type}">`).join('')}
        </div>
        
        </div>
        <div class="modal-body">
          <div class="align-self-center">
            <span class=" float-left"><img src="${pokemon.photo}" alt="${pokemon.name}" class="card-img-top pse-2 mt-4"></span>
          </div>
          <span >#${pokemon.number}</span>

        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

function loadPokemon(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}
function loadPokemonDetails(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToDetails).join('')
      pokemonList.innerHTML += newHtml
  })
}

loadPokemon(offset, limit)
loadPokemonDetails(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)
        loadPokemonDetails(offset, limit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemon(offset, limit)
        loadPokemonDetails(offset, limit)
    }
})

/*  Em LoadpokemonItens
    realizar um segundo getPokemons para acrescentar os detalhes do pokemon*/