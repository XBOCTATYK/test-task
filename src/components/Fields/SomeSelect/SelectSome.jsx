import React, {Component} from 'react';
import {emptyFunction} from "../../../helpers/emptyFuction";

const DEFAULT_OPTIONS = {
    max: 9999,
    min: 0
};

/**
 *
 * @param InputComponent - компонент с интупом в котором вводятся значения
 * @param ListComponent - список выбранных значений
 * @param options - дополнительные параметры
 * @returns {{defaultProps, new<P, S>(props: Readonly<P>): SelectSomeComponent, new<P, S>(props: P, context?: any): SelectSomeComponent, prototype: SelectSomeComponent}}
 */
export const selectSome = function(InputComponent, ListComponent, options = DEFAULT_OPTIONS) {
    return class SelectSomeComponent extends Component {

        static defaultProps = {
            onChange: emptyFunction
        };

        state = {
            items: this.props.items || [],
            value: [],
            max: options.max,
            min: options.min,
            touched: false,
            disabled: false
        };

        whenValueChanges = (value) => {
            const valueToSend = value.length ? JSON.stringify(value) : '';

            this.props.onChange({target: {value: valueToSend, name: this.props.name, type: 'text'}});
        };

        validate = (value) => {
            return (value.length >= this.state.max || (value.length < this.state.min && value.length !== 0));
        };

        onAdd = (event) => {
            if (!event.target) {
                event.target = {};
                event.target.value = event.value;
            }
            const value = event.target.value;
            let newValue = this.state.value;
            let newItems = this.state.items;

            newItems = newItems.filter(item => item.value !== value);
            newValue.push(value);

            const disabled = this.validate(newValue);

            this.setState({value: newValue, items: newItems, disabled: disabled}, () => {
                this.whenValueChanges(newValue);
            });
        };

        onRemove = (event) => {
            if (!event.target) {
                event.target = {};
                event.target.value = event.value;
            }

            const value = event.target.value;
            let newValue = this.state.value;
            let newItems = this.state.items;

            newValue = newValue.filter(item => item !== value);
            newItems.push(this.props.items.find((item) => {
                return item.value === value;
            }));

            const disabled = this.validate(newValue);

            this.setState({value: newValue, items: newItems, disabled: disabled}, () => {
                this.whenValueChanges(newValue);
            });
        };

        componentDidMount() {
            let valueArr = [];
            try {
                valueArr = JSON.parse(this.props.value);
                valueArr = valueArr.filter(item => item !== '');
            } catch (e) {
                valueArr = [];
                this.whenValueChanges(valueArr);
            }

            const disabled = this.validate(valueArr);
            const items = this.props.items.filter(item => {return !valueArr.includes(item.value)});

            this.setState({value: valueArr, touched: true, items: items, disabled: disabled});
        }

        render() {
            if (!this.state.items.length) return false;

            return (
                <React.Fragment>
                    <ListComponent
                        {...this.props}
                        remove={this.onRemove}
                        items={this.props.items}
                        itemIds={this.state.value}/>
                    <InputComponent
                        {...this.props}
                        placeholder={this.state.disabled ? 'Выбрано максимальное количество элементов' : this.props.placeholder}
                        disabled={this.state.disabled}
                        onChange={this.onAdd}
                        items={this.state.items}
                    />


                </React.Fragment>

            );
        }
    };
};
