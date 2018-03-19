export const actionCheck = (id) => {
    return {
        type: CHECKED,
        value: id
    };
};

export const actionUnCheck = (id) => {
    return {
        type: UNCHECKED,
        value:id
    };
};

export const actionClear = () => {
    return {
        type: CLEAR
    };
};


export const CLEAR = 'CLEAR';
export const CHECKED = 'CHECKED';
export const UNCHECKED = 'UNCHECKED';
