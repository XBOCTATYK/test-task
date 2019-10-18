import React, {Component} from 'react';
import {emptyFunction} from "../../../helpers/emptyFuction";

const defaultFilteredFunction = (item, value) => {
    const lowerCaseLabel = item.label.toLowerCase();
    const lowerCaseValue = value.toLowerCase();
    return lowerCaseLabel.indexOf(lowerCaseValue) !== -1;
};

const DEFAULT_OPTIONS = {
    filterFunction: defaultFilteredFunction
};

/**
 * Фильтрация элементов в зависимости от введенного значения инпута
 * @param InputComponent - компонент с интупом, по значению которого будут фильтроваться данные
 * @param ListComponent - компонент для которого фильтруются данные
 * @param options
 * @returns {{defaultProps, new<P, S>(props: Readonly<P>): SearchItemsComponent, new<P, S>(props: P, context?: any): SearchItemsComponent, prototype: SearchItemsComponent}}
 */
export const widthSearch = function(InputComponent, ListComponent, options = DEFAULT_OPTIONS) {
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
            active: false
        };

        componentDidMount() {
            if (this.props.value) {
                this._filterItems(this.props.items);
            }

        }

        onChange = (event) => {
            console.log(event.target);
            const value = event.target.value;

            this.setState({value: value, active: true})
        };

        onSelect = (event) => {
            const value = event.target.value;

            this.props.onChange({target: {value: value, name: this.props.name}});
            this.setState({selectValue: value, active: false, value: ''})
        };

        onFocus = (event) => {
            this.setState({active: true})
        };

        onBlur = () => {
            /* Чтобы успевал срабатывать клик по опции */
            setTimeout(() => {
                this.setState({active: false})
            }, 200);
        };

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.items !== this.props.items) {
                this.setState({items: this.props.items})
            }
        }

        _filterItems = (items, value) => {
            if (!value) return items;

            let newItems =  items.filter(item => {
               return this.props.filterFunction(item, value);
            });

            if (!newItems.length) {
                newItems = [{value: -1, label: 'Не найдено вариантов по вашему запросу', disabled: true}];
            }

            return newItems;
        };

        render() {
            return (
            <React.Fragment>
                <InputComponent onFocus={this.onFocus} onChange={this.onChange} onBlur={this.onBlur} value={this.state.value}/>
                <ListComponent onChange={this.onSelect}
                                 open={this.state.active}
                                 value={this.state.selectValue}
                                 items={this._filterItems(this.props.items, this.state.value)}/>
            </React.Fragment>
            )
        }
    }
};

