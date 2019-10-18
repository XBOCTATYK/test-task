import React, {Component} from 'react';
import {emptyFunction} from "../../../helpers/emptyFuction";

const defaultFilteredFunction = (item, value) => {
    return item.label.indexOf(value) !== -1;
};

const DEFAULT_OPTIONS = {
    filterFunction: defaultFilteredFunction
};

export const widthSearch = function(InputComponent, SelectComponent, options = DEFAULT_OPTIONS) {
    return class SearchItemsComponent extends Component {

        static defaultProps = {
            items: [],
            value: null,
            filterFunction: options.filterFunction,
            onChange: emptyFunction,
            name: null
        };

        state = {
            items: this.props.items || [],
            value: '',
            selectValue: '',
            opened: false
        };

        componentDidMount() {
            if (this.props.value) {
                this.filterItems();
            }
        }

        onChange = (event) => {
            const value = event.target.value;
            let items = this._filterItems(this.props.items, value);

            if (!items.length) {
                items = [{value: -1, label: 'Не найдено вариантов по вашему запросу', disabled: true}];
            }

            this.setState({value: value, items: items})
        };

        onSelect = (event) => {
            const value = event.target.value;

            this.props.onChange({target: {value: value, name: this.props.name}});
            this.setState({selectValue: value, opened: false})
        };

        onFocus = () => {
            this.setState({opened: true})
        };


        _filterItems = (items, value) => {
            if (!value) return items;

            return items.filter(item => {
               return this.props.filterFunction(item, value);
            });
        };

        render() {
            return (
            <React.Fragment>
                <InputComponent onFocus={this.onFocus} onChange={this.onChange}/>
                <SelectComponent onChange={this.onSelect} open={this.state.opened} value={this.state.selectValue} items={this.state.items}/>
            </React.Fragment>
            )
        }
    }
};

