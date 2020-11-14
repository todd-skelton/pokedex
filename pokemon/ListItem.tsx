import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { QueryFunction, useQuery } from "react-query";
import { PokemonListItem } from "./List";

const ListItem: FC<PokemonListItem> = ({ name, url }) => {
    const { data } = useQuery<Pokemon, Error>(url, fetchPokemon)

    if (data) return (
        <List.Item
            title={name}
            description={`#${data.id}`}
            left={() => <Image style={styles.sprite} source={{ uri: data.sprites.front_default }} />}
            right={() => <View style={styles.types}>{data.types.map(({ slot, type }) => <Text style={{ ...styles.type, ...styles[type.name] }} key={slot}>{type.name}</Text>)}</View>}
        />
    )
    else return <List.Item title={name} left={() => <View style={styles.sprite} />} />
}

export default ListItem;

const styles = StyleSheet.create({
    sprite: {
        width: 96,
        height: 96,
    },
    types: {
        alignSelf: "center"
    },
    type: {
        paddingVertical: 2,
        width: 64,
        textAlign: "center",
        borderRadius: 5,
        color: "white"
    },
    fire: {
        backgroundColor: "#F08030",
    },
    flying: {
        backgroundColor: "#A890F0",
    },
    grass: {
        backgroundColor: "#78C850",
    },
    water: {
        backgroundColor: "#6890F0"
    },
    bug: {
        backgroundColor: "#A8B820"
    },
    poison: {
        backgroundColor: "#A040A0"
    },
    normal: {
        backgroundColor: "#A8A878"
    },
    electric: {
        backgroundColor: "#F8D030"
    },
    ground: {
        backgroundColor: "#E0C068"
    },
    fairy: {
        backgroundColor: "#EE99AC"
    },
    fighting: {
        backgroundColor: "#C03028"
    },
    psychic: {
        backgroundColor: "#F85888"
    },
    ghost: {
        backgroundColor: "#705898"
    },
    dark: {
        backgroundColor: "#705848"
    },
    dragon: {
        backgroundColor: "#7038F8"
    },
    ice: {
        backgroundColor: "#98D8D8"
    },
    rock: {
        backgroundColor: "#B8A038"
    },
    steel: {
        backgroundColor: "#B8B8D0"
    }
});

const fetchPokemon: QueryFunction<Pokemon> = async (url: string) => {
    try {
        const result = await fetch(url)
        return result.json();
    } catch (error) {
        return error;
    }
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: Species[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
}

export interface Ability {
    is_hidden: boolean;
    slot: number;
    ability: Species;
}

export interface Species {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: Species;
}

export interface HeldItem {
    item: Species;
    version_details: VersionDetail[];
}

export interface VersionDetail {
    rarity: number;
    version: Species;
}

export interface Move {
    move: Species;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    version_group: Species;
    move_learn_method: Species;
}

export interface Sprites {
    back_female: string;
    back_shiny_female: string;
    back_default: string;
    front_female: string;
    front_shiny_female: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: Other;
    versions: Versions;
}

export interface Other {
    dream_world: DreamWorld;
    "official-artwork": DreamWorld;
}

export interface DreamWorld {
}

export interface Versions {
    "generation-i": GenerationI;
    "generation-ii": GenerationIi;
    "generation-iii": GenerationIii;
    "generation-iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-vi": { [key: string]: DreamWorld };
    "generation-vii": GenerationVii;
    "generation-viii": GenerationViii;
}

export interface GenerationI {
    "red-blue": DreamWorld;
    yellow: DreamWorld;
}

export interface GenerationIi {
    crystal: DreamWorld;
    gold: DreamWorld;
    silver: DreamWorld;
}

export interface GenerationIii {
    emerald: DreamWorld;
    "firered-leafgreen": DreamWorld;
    "ruby-sapphire": DreamWorld;
}

export interface GenerationIv {
    "diamond-pearl": DreamWorld;
    "heartgold-soulsilver": DreamWorld;
    platinum: DreamWorld;
}

export interface GenerationV {
    "black-white": DreamWorld;
}

export interface GenerationVii {
    icons: DreamWorld;
    "ultra-sun-ultra-moon": DreamWorld;
}

export interface GenerationViii {
    icons: DreamWorld;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: Species;
}

export interface Type {
    slot: number;
    type: Species;
}
