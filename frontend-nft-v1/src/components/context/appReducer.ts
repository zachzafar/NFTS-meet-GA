import { ActionKind, State, Action, NFT } from '../types/types'

/**
 * @type {State}
 * Initial State object for AppContext
 */
export const initialState: State = {
    userStatus: false,
    modalStatus: false,
    modalNft: undefined,
    NFTs: [],
    saveNFTs: (NFTs: NFT[]) => { },
    updateUserStatus: (userStatus: boolean) => { },
    updateModalStatusAndModalNft: (modalStatus: boolean, NFT: NFT | undefined | null) => { },
}


/**
 * App reducer is used to update the state of the AppContext
 * @param {State} state The current state of the AppContext
 * @param {Action} action The action to be executed to alter the state
 */
const appReducer = (state: State, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.SAVE_NFTS:
            return {
                ...state,
                NFTs: payload.NFTs
            }

        case ActionKind.UPDATE_USER_STATUS:
            return {
                ...state,
                userStatus: payload.userStatus
            }

        case ActionKind.UPDATE_MODAL_STATUS_AND_MODAL_NFT:
            return {
                ...state,
                modalStatus: payload.modalStatus,
                modalNft: payload.modalNft
            }

        default:
            throw new Error(`No case for type ${type} found in appReducer`);
    }
}

export default appReducer;