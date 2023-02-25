// Formatter Function
export const toPascalNotation = (string: any) => {
  const str = string.toLowerCase().split("-");

  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
  }

  return str.join(" ");
};

export const PokemonOriginId = (url: any) => {
  return url
    .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
    .replace("/", "");
};

export const Pokemon = async (
  minOffSet: number,
  maxOffSet: number,
  pokeDex: any,
  state: any,
  isSearch: any
) => {
  for (let i = minOffSet; i < maxOffSet; i++) {
    const res = await fetch(
      isSearch ? pokeDex[i].url : `https://pokeapi.co/api/v2/pokemon/${i + 1}`
    );
    const data = await res.json();
    const { types, abilities, height, weight, stats } = data;
    const pokemonId = pokeDex[i].url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");

    if (pokeDex[i] !== undefined) {
      let pokemonType: any = [];
      let pokemonAbilities: any = [];
      const { name } = pokeDex[i];

      // Map Pokemon Type
      for (let j = 0; j <= types.length; j++) {
        if (types[j] !== undefined) {
          pokemonType.push(types[j].type.name);
        }
      }

      // Map Pokemon Abilities
      for (let k = 0; k < 2; k++) {
        if (abilities[k] !== undefined) {
          pokemonAbilities.push(toPascalNotation(abilities[k].ability.name));
        }
      }

      // Set Component State
      state((prev: any): any => [
        ...prev,
        {
          id: isSearch ? pokemonId : i + 1,
          name: toPascalNotation(name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
            isSearch ? pokemonId : i + 1
          }.gif`,
          type: pokemonType,
          abilities: pokemonAbilities,
          info: [`${height / 10}m`, `${weight / 10}kg`],
          stats: [
            { name: "hp", value: stats[0].base_stat },
            { name: "attk", value: stats[1].base_stat },
            { name: "def", value: stats[2].base_stat },
            { name: "spa", value: stats[3].base_stat },
            { name: "spd", value: stats[4].base_stat },
            { name: "spD", value: stats[5].base_stat },
            {
              name: "tot",
              value:
                stats[0].base_stat +
                stats[1].base_stat +
                stats[2].base_stat +
                stats[3].base_stat +
                stats[4].base_stat +
                stats[5].base_stat,
            },
          ],
        },
      ]);
    }
  }
};

export const PokemonDescription = async (
  id: number,
  name: string,
  state: any,
  image: any,
  type: any,
  abilities: any,
  info: any,
  stats: any
) => {
  let description = "";
  let evolutionChain: any = [];
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();
  const { flavor_text_entries, evolution_chain } = data;

  const evolutionRes = await fetch(evolution_chain.url);
  const evolutionData = await evolutionRes.json();
  const { chain } = evolutionData;

  for (let i = 0; i < flavor_text_entries.length; i++) {
    if (flavor_text_entries[i].language.name === "en") {
      description = toPascalNotation(
        flavor_text_entries[i].flavor_text.replace("", " ")
      );
      break;
    }
  }

  if (chain.evolves_to.length != 0) {
    const firstLevel = Number(
      chain.evolves_to[0].evolution_details[0].min_level
    );
    const secondLevel =
      chain.evolves_to[0].evolves_to[0]?.evolution_details[0].min_level;

    evolutionChain.push(
      {
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokemonOriginId(
          chain.species.url
        )}.gif`,
        level: firstLevel ? firstLevel : "?",
      },
      {
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokemonOriginId(
          chain.evolves_to[0].species.url
        )}.gif`,
        level: secondLevel ? secondLevel : "?",
      }
    );
    if (chain.evolves_to[0].evolves_to.length != 0) {
      evolutionChain.push({
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokemonOriginId(
          chain.evolves_to[0].evolves_to[0].species.url
        )}.gif`,
        level: "",
      });
    } else {
      evolutionChain = [];
      evolutionChain.push(
        {
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokemonOriginId(
            chain.species.url
          )}.gif`,
          level: firstLevel ? firstLevel : "?",
        },
        {
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokemonOriginId(
            chain.evolves_to[0].species.url
          )}.gif`,
          level: "",
        }
      );
    }
  } else {
    evolutionChain = [];
  }

  state({
    id: id,
    name: toPascalNotation(name),
    description: description,
    image: image,
    type: type,
    abilities: abilities,
    info: info,
    stats: stats,
    evolution: evolutionChain,
  });
};
