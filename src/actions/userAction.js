export const actionChoseActiveUser = (id, name) => {
    return {
        type: CHOOSE,
        userId: id,
        userName: name,
    };
};


export const CHOOSE = 'CHOOSE';
