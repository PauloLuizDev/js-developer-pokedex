
const pokeApi = {}

async function pokemonTo(response) {
    console.log(response)
    let pokemon = new Pokemon(response)

    let busca = await fetch(response.species.url);
    let userData = await busca.json();
    pokemon.description = userData.flavor_text_entries[0].flavor_text;
    pokemon.habitat = userData.habitat.name;
    pokemon.capture_rate = userData.capture_rate;

    console.log(pokemon);

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((jsonBody) => pokemonTo(jsonBody))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
