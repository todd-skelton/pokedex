import React, { Fragment } from "react";
import { FlatList } from "react-native";
import { Text, Title } from "react-native-paper";
import { QueryFunction, useInfiniteQuery } from "react-query";
import ListItem from "./ListItem";

export default function List() {
    const {
        data,
        error,
        isFetching,
        isFetchingMore,
        fetchMore,
        canFetchMore
    } = useInfiniteQuery<PokemonList, Error>('pokemon-list', fetchPokemon, {
        getFetchMore: lastPage => lastPage.next
    });

    if (data) return (
        <Fragment>
            <FlatList
                data={data.map(page => page.results).reduce((all, page) => [...all, ...page])}
                renderItem={({ item }) => <ListItem {...item} />}
                keyExtractor={item => item.name}
                onEndReachedThreshold={5}
                onEndReached={() => canFetchMore && fetchMore()}
            />
            {isFetchingMore ? <Text>Fetching More...</Text> : <Fragment />}
        </Fragment>
    );
    else if (isFetching) return <Title>Fetching...</Title>
    else if (error) return <Title>Error Loading Data: {error.message}</Title>
    else return <Fragment />
}

const fetchPokemon: QueryFunction<PokemonList> = async (_, cursor: string) => {
    try {
        const result = await fetch(cursor || "https://pokeapi.co/api/v2/pokemon/")
        return result.json();
    } catch (error) {
        return error;
    }
}

export interface PokemonList {
    count: number;
    next?: string;
    previous?: string;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}