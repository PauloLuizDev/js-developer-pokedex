class Pokemon {
  number; //número do pokemon na pokedex
  name; //nome do pokemon
  type; //tipo principal do pokemon
  types = []; //outros possiveis tipos
  photo; //sprite do pokemon, 3 tipos disponiveis DreamWorld, Default e novo
  description; //Breve descrição do pokemon precisa de outra fetch para buscar
  attacks = []; //lista de possiveis ataques
  statsNames = []; //abrvNames(pokemon.stats.name); //nome das estatisticas hp, attack, defense, specialAtack, specialDefense, speed implementar função para retornar abreviações
  statsNumbers = []; //valor das estatisticas

  constructor(response) {

    this.number = response.id;

    this.name = response.name;

    this.types = response.types.map((typeSlot) => typeSlot.type.name);

    const [tipo] = this.types;

    this.type = tipo;

    this.photo = response.sprites.other.dream_world.front_default;

    this.description = "";

    this.attacks = response.moves.map((statSlot) => statSlot.move.name);

    this.statsNames = response.stats.map((statSlot) => {
      switch (statSlot.stat.name) {
        case "hp":
          return "HP";
        case "attack":
          return "ATK";
        case "defense":
          return "DEF";
        case "special-attack":
          return "SAT";
        case "special-defense":""
          return "SDF";
        case "speed":
          return "SPD";
        case "":
          return console.log("nome da estatistica vazio");
        default:
          return "statsName";
      }
    });

    this.statsNumbers = response.stats.map((statSlot) => statSlot.base_stat);
    console.log(this);
/*  
    async function getPokeDescription(response) { 
      return await fetch(response.species.url)
        .then((response) =>  response.json())
        .then((data) =>  data.flavor_text_entries[0].flavor_text)
      }
  
 
  async function getPokeDescription(pokemon) { 
      let response = await fetch(pokemon.species.url);
      let userData = await response.json();
      return userData.flavor_text_entries[0].flavor_text;

      
    }
*/
  }
}
