// Package
import { useEffect, useState } from "react";

// MUI & Theme Style
import { Box, Typography, Stack } from "@mui/material";
import { useBoxStyles, useFlex, useCardStyles } from "../Assets/Theme";

// Constant
import { typeColors } from "../Constant/default";

// Helper
import { toPascalNotation, PokemonDescription } from "../Helper/functions";

function PokedexList({ pokeDex, select, minOffSet, maxOffSet }: any) {
  // Theme
  const box = useBoxStyles();
  const flex = useFlex();
  const card = useCardStyles();

  // State
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(18);

  useEffect(() => {
    minOffSet(min);
    maxOffSet(max);
  }, [min, max]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setMin(min + 18);
        setMax(max + 18);
      }
    });
  });

  return (
    <>
      {pokeDex.map((keys: any) => (
        <Box
          id="Pokemon"
          key={keys.id}
          className={`${box.default} ${card.default} ${flex.center} ${flex.column}`}
          onClick={async () => {
            await PokemonDescription(
              keys.id,
              keys.name,
              select,
              keys.image,
              keys.type,
              keys.abilities,
              keys.info,
              keys.stats
            );
          }}
        >
          <Box component="img" className="pokemon-image" src={keys.image} />
          <Typography
            component="span"
            style={{
              color: "#8F9396",
              fontWeight: 700,
              fontSize: 12,
              marginTop: 25,
            }}
          >
            {`N° ${keys.id}`}
          </Typography>
          <Box component="h3">{keys.name}</Box>
          <Stack flexDirection="row" gap={0}>
            {keys.type.map((type: any, i: any) => (
              <Box
                key={`${type}-${i}`}
                className="type-container"
                style={{ backgroundColor: typeColors[type] }}
              >
                {toPascalNotation(type)}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </>
  );
}

export default PokedexList;
