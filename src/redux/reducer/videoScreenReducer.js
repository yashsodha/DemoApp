import * as types from '../action/actionTypes';
const initialState = {
    finalAnswere: "hello",
    videos: [],
    isLoadingVideo: false,
    loadMoreVideo: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `${types.GET_VIDEOS}_PENDING`:
            return {
                ...state,
                videos: [],
                isLoadingVideo: true
            }
        case `${types.GET_VIDEOS}_FULFILLED`:
            return {
                ...state,
                videos: action.payload.videos,
                isLoadingVideo: false
            }
        case `${types.GET_VIDEOS}_REJECTED`:
            return {
                ...state,
                isLoadingVideo: false
            }


        case `${types.LOAD_MORE_VIDEOS}_PENDING`:
            return {
                ...state,
                loadMoreVideo: true
            }
        case `${types.LOAD_MORE_VIDEOS}_FULFILLED`:
            return {
                ...state,
                videos: [...state.videos, ...action.payload.videos],
                loadMoreVideo: false
            }
        case `${types.LOAD_MORE_VIDEOS}_REJECTED`:
            return {
                ...state,
                loadMoreVideo: false
            }
        default:
            return state;
    }

}