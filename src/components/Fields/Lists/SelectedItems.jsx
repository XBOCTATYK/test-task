import React from 'react';

const SelectedItems = ({items: itemsProp, itemIds, remove}) => {
    if (!itemIds.length) return false;

    let items = {};

    itemsProp.forEach(item => {
        items[item.value] = item;
    });

    const tags = itemIds.map(item => {
        if (!items[item]) return false;

        return <div key={items[item].value} className="tag-int appear">
            {items[item].label}
            <div onClick={remove.bind(null, {target: {value: items[item].value}})} className="tag-int__delete" id="null"/>
        </div>;
    });

    return (
        <div className="tags-cloud">
            <div className="tags-cloud__selected">
                {tags}
            </div>
        </div>
    );
};

export default SelectedItems;
