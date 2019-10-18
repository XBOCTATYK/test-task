import React from 'react';
import {widthSearch} from "../WithSearch/WithSearch";
import TextInput from "../InputComponent/TextInput";
import {selectSome} from "../SomeSelect/SelectSome";
import SelectFieldList from "../SelectFieldList/SelectFieldList";
import SelectedItems from "../Lists/SelectedItems";

const MultiSelectComposedComponent = selectSome(widthSearch(TextInput, SelectFieldList), SelectedItems);

const items = [
    {value: 1, label: 'Москва'},
    {value: 2, label: 'Петербург'},
    {value: 3, label: 'Ростов-на-Дону'},
    {value: 4, label: 'Воронеж'},
    {value: 5, label: 'Белград'},
    {value: 6, label: 'Новосибирск'},
    {value: 7, label: 'Кемерово'},
    {value: 8, label: 'Брянск'},
    {value: 9, label: 'Норильск'},
    {value: 10, label: 'Владивосток'}
];

const MultiSelectSearch = () => {
    return (
        <div className="multi-select-search">
            <MultiSelectComposedComponent items={items}/>
        </div>
    );
};

export default MultiSelectSearch;
