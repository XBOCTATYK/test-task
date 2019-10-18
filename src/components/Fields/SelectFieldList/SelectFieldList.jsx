import React, {Component} from 'react';

/**
 * Простая реализация списка выбираемых значений
 */
class SelectFieldList extends Component {

    static defaultProps = {
        open: false
    };

    state = {
        value: this.props.value || '',
        items: this.props.items || []
    };

    onChange = (value, event) => {
        console.log(value, event);
        this.setState({value: value}, () => {
            this.props.onChange({target: {value: value, valueText: event, name: this.props.name}});
        });
    };

    getOptions = () => {
        return this.props.items.map(item => {
            return <div key={item.value}
                        onClick={this.onChange.bind(null, item.value)}
                        className={`select-list__option ${item.disabled ? 'disabled': ''}`}>
                {item.label}
            </div>
        })
    };

    render() {
        if (!this.state.items.length) return false;

        return (
            <React.Fragment>
                { this.props.open &&
                    <div className="select-list">
                        {this.getOptions()}
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default SelectFieldList;
