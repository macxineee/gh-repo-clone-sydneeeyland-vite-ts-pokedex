// Package
import { useEffect, useState } from "react";

// MUI & Theme Style
import { Box, Typography, Stack } from "@mui/material";
import { useBoxStyles, useFlex, useMargin, useWidth } from "../Assets/Theme";

// Pages
import PokedexList from "../Modules/PokedexList";

// Assets
import Placeholder from "../Assets/Images/Pokedex-placeholder.png";
import Pokeball from "../Assets/Images/Pokeball.png";
import PokeballLoading from "../Assets/Images/pokeball-icon.png";
import Select from "../Assets/Audio/select.mp3";

// Constant
import { typeColors, statsColor } from "../Constant/default";

// Helper
import { toPascalNotation, Pokemon } from "../Helper/functions";

function PokeDex() {
  // Theme
  const box = useBoxStyles();
  const flex = useFlex();
  const margin = useMargin();
  const width = useWidth();

  // State
  const [pokeDex, setPokeDex] = useState<any>([]);
  const [pokemons, setPokemons] = useState<any>([]);
  const [minOffSet, setMinOffSet] = useState(0);
  const [maxOffSet, setMaxOffSet] = useState(18);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState<any>();

  useEffect(() => {
    const Request = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=898");
      const data = await res.json();
      const { results } = data;
      await Pokemon(minOffSet, maxOffSet, results, setPokeDex, false);
      setPokemons(results);
      setLoading(false);
    };
    Request();
  }, [minOffSet, maxOffSet]);

  const handleClickAction = (data: any) => {
    new Audio(Select).play();
    document
      .getElementById("selected-pokemon-container")
      ?.classList.remove("slide-in");
    document
      .getElementById("selected-pokemon-container")
      ?.classList.toggle("slide-out");

    setTimeout(() => {
      setSelectedPokemon(data);
      document
        .getElementById("selected-pokemon-container")
        ?.classList.remove("slide-out");
      document
        .getElementById("selected-pokemon-container")
        ?.classList.toggle("slide-in");
    }, 400);
  };

  const handleSearch = async (search: string) => {
    if (search !== "") {
      const filter = pokemons.filter((key: any) => key.name.includes(search));
      setPokeDex([]);
      await Pokemon(0, filter.length, filter, setPokeDex, true);
    } else {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=898");
      const data = await res.json();
      const { results } = data;
      await Pokemon(minOffSet, maxOffSet, results, setPokeDex, false);
    }
  };

  return (
    <Box className={flex.column}>
      <Box className={flex.row}>
        <Box id="pokedex-list" className={`pokedex-list ${flex.column}`}>
          <Box className={`${flex.row} ${box.default} ${margin.margin40}`}>
            <input
              type="text"
              placeholder="Search your Pokemon"
              onBlur={(e: any) => handleSearch(e.target.value)}
            />
            <Box className={`search-button ${flex.center}`}>
              <img src={Pokeball} width="25" height="25" />
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexFlow: "wrap row",
              justifyContent: "center",
            }}
          >
            <PokedexList
              pokeDex={loading ? [] : pokeDex}
              select={handleClickAction}
              minOffSet={setMinOffSet}
              maxOffSet={setMaxOffSet}
            />
          </Box>
        </Box>
        <Box
          id="selected-pokemon-container"
          className={`selected-pokemon-container ${box.var1} ${flex.center} ${flex.column}`}
        >
          <Box
            component="img"
            className="pokedex-placeholder"
            src={
              selectedPokemon === undefined
                ? Placeholder
                : selectedPokemon.image
            }
            style={{
              height: selectedPokemon === undefined ? "unset" : "100%",
            }}
          />
          {selectedPokemon !== undefined ? (
            <Box className="current-pokemon-info">
              <Typography
                component="span"
                style={{ fontWeight: "bold", fontSize: 12, color: "#8F9396" }}
              >{`N° ${selectedPokemon.id}`}</Typography>
              <h2>{selectedPokemon.name}</h2>
              <Stack flexDirection="row" className={flex.center}>
                {selectedPokemon.type.map((type: any, i: any) => (
                  <Box
                    key={`${type}-${i}`}
                    className="type-container"
                    style={{ backgroundColor: typeColors[type] }}
                  >
                    {toPascalNotation(type)}
                  </Box>
                ))}
              </Stack>
              <h4 style={{ marginTop: 10 }}>POKEDEX ENTRY</h4>
              <Typography
                component="span"
                style={{ marginTop: 8, color: "#8F9396" }}
              >
                {selectedPokemon.description}
              </Typography>
              <h4 style={{ marginTop: 10 }}>ABILITIES</h4>
              <Stack flexDirection="row" className={flex.center}>
                {selectedPokemon.abilities.map((ability: any, i: any) => (
                  <Box
                    key={`${ability}-${i}`}
                    className="pokemon-info-abilities-container"
                  >
                    {ability}
                  </Box>
                ))}
              </Stack>
              <Box className={`${flex.row} ${flex.center}`}>
                <Box
                  className={`${flex.center} ${flex.column} ${margin.margin5} ${width.w100}`}
                >
                  <Box component="h4">Height</Box>
                  <Box className="pokemon-info-weightHeight-container">
                    {selectedPokemon.info[0]}
                  </Box>
                </Box>
                <Box
                  className={`${flex.center} ${flex.column} ${margin.margin5} ${width.w100}`}
                >
                  <Box component="h4">Weight</Box>
                  <Box className="pokemon-info-weightHeight-container">
                    {selectedPokemon.info[1]}
                  </Box>
                </Box>
              </Box>
              <Box className={margin.mt15} component="h4">
                STATS
              </Box>
              <Box className={`${flex.row} ${flex.center}`}>
                {selectedPokemon.stats.map((obj: any, index: any) => (
                  <Box
                    key={`${obj.name}-${index}`}
                    className={`pokemon-info-stats-container ${flex.column}`}
                    style={{
                      backgroundColor:
                        obj.name === "tot" ? "#88AAEA" : "#F6F8FC",
                    }}
                  >
                    <Box
                      className="pokemon-info-stats-circle-container"
                      style={{ backgroundColor: statsColor[obj.name] }}
                    >
                      {obj.name.toUpperCase()}
                    </Box>
                    <Box className={margin.margin6} component="h5">
                      {obj.value}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box className={margin.mt15} component="h4">
                EVOLUTION
              </Box>
              <Box className={`${flex.row} ${flex.center}`}>
                {selectedPokemon.evolution.map((obj: any) => (
                  <>
                    <Box component="img" src={obj.image} />
                    {(obj.level > 0 || obj.level === "?") && (
                      <Box className="pokemon-info-evolution-level-container">
                        {obj.level}
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography
              component="span"
              style={{ fontSize: "18px", color: "#8F9396" }}
            >
              Select a Pokemon to display here.
            </Typography>
          )}
        </Box>
        <Box
          component="img"
          id="current-pokemon-loading"
          src={PokeballLoading}
          className="loading-ball"
        />
      </Box>
    </Box>
  );
}

export default PokeDex;
