import {CHECKED, UNCHECKED, CLEAR} from '../actions/checkAction';

const initialState = {
    ids: []
};

export default (state = initialState, action) => {
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    switch (action.type) {
        case CHECKED :
            state.ids.push(action.value);
            return Object.assign({},state);
        case UNCHECKED :
            state.ids = state.ids.remove(action.value).splice();
            return  state;
        case  CLEAR:
            state.ids = [];
            return state;
        default :
            return state;
    }


}

