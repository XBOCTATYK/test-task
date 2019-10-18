import React, {Component} from 'react';

class SelectFieldList extends Component {

    static defaultProps = {
        open: false
    };

    state = {
        value: this.props.value || '',
        items: this.props.items || []
    };

    UNSAFE_componentWillMount() {
        this.setItems(this.props.value);
    }

    setItems = (value) => {
        let hasCurrentValue = false;
        let items = this.props.items.map(item => {
            if (String(item.value) === String(this.props.value)) {
                hasCurrentValue = true;
            }

            return item;
        });

        this.setState({items: items}, () => {
            /* Если нужного value нет в списке */
            if (value && this.state.items.length && !hasCurrentValue) {
                this.onChange({target: {value: ''}});
            }
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.items !== this.props.items) {
            this.setItems(this.props.value);
        }
    }

    onChange = (value, event) => {
        console.log(value, event);
        this.setState({value: value}, () => {
            this.props.onChange({target: {value: value, valueText: event, name: this.props.name}});
        });
    };

    getOptions = () => {
        return this.state.items.map(item => {
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
