//изза конфликта имен, тег Table из библиотеки импортируем под другим именем

import { Table as AntTable, Typography, Image } from "antd"
import { useState } from "react";
import { pokemonData } from './data.js'
const { Paragraph } = Typography; //рендерится как div, Text как span

const pokemonDatawithKey = pokemonData.map(pokemon => (
    //{...pokemon, key: pokemon.id}
    //для таблицы нужно чтоб в объекте было поле key
    {
        name: pokemon.name,
        number: pokemon.number,
        key: pokemon.id,//обязательное поле
        classification: pokemon.classification,
        maxHP: pokemon.maxHP,
        maxCP: pokemon.maxCP,
        image: pokemon.image
    }
))

export const Table = ({ rows = 20 }) => {

    


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Paragraph copyable>{text}</Paragraph>
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Class',
            dataIndex: 'classification',
            key: 'classification',
            filters: [ //фильтры для сортировки
                {
                    text: 'Seed', //отображается на странице
                    value: 'Seed Pokémon', //ищется в базе
                },
                {
                    text: 'Insect',
                    value: 'Insect Pokémon',
                },
                {
                    text: 'Flame',
                    value: 'Flame Pokémon',
                },
            ],
            onFilter: (value, item) => item.classification.includes(value) // === true
        },
        {
            title: 'Heal Points',
            dataIndex: 'maxHP',
            key: 'maxHP',
            sorter: (a, b) => a.maxHP - b.maxHP,
            defaultSortOrder: 'descend' // 'ascend'
        },
        {
            title: 'Combat Points',
            dataIndex: 'maxCP',
            key: 'maxCP',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <Image src={url} width='100px' preview={false} />
        }
    ];

    return <AntTable dataSource={pokemonDatawithKey} columns={columns} pagination={
        {
            pageSize: rows,
            pageSizeOptions: [50, 150], //[50, 150] изменение количества строк в таблице
            showSizeChanger: false //запрет изменения строк в таблице

        }} />

}

//export default _Table;

