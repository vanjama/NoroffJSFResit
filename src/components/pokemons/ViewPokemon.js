import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import SinglePokemonCard from "./SinglePokemonCard";
import { Link, useParams } from "react-router-dom";
import Heading from "../layout/Heading";

export default function ViewPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { id } = useParams();

  const pokemon_url = BASE_URL + `${id}`;

  useEffect(function () {
    async function retrivePokemon() {
      try {
        const response = await axios.get(pokemon_url);
        console.log(response.data);
        setPokemon(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    retrivePokemon();
  }, []);
  if (loading) return <div>Loading pokemons...</div>;

  if (error) return <div>{}</div>;

  return (
    <div className="container">
      <Heading content="Pokemon" />

      <SinglePokemonCard
        key={pokemon.id}
        name={pokemon.name}
        id={pokemon.id}
        images={pokemon.images.small}
        href={pokemon.id}
        rarity={pokemon.rarity}
        level={pokemon.level}
        hp={pokemon.hp}
        evolvesFrom={pokemon.evolvesFrom}
      />
      <button className="info_link">
        <Link to={`/pokemons/${pokemon.id}/info`}>
          Click here for more info about the pokemon
        </Link>
      </button>
    </div>
  );
}
