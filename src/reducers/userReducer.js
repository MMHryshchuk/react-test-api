import {CHOOSE} from '../actions/userAction';

const initialState = {
    userId: '',
    userName: '',
    isUser: false
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CHOOSE :
            state.userId = action.userId;
            state.userName = action.userName;
            if (state.userId === ''){
                state.isUser = false;
            }else {
                state.isUser = true;
            }
            return Object.assign({},state);
        default :
            return state;
    }


}

