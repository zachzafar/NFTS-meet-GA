import { ActionKind, State, Action, NFT } from '../types/types'

export const initialState: State = {
    userStatus: false,
    modalStatus: false,
    modalNft: undefined,
    NFTs: [],
    saveNFTs: (NFTs: NFT[]) => { },
    updateUserStatus: (userStatus: boolean) => { },
    updateModalStatusAndModalNft: (modalStatus: boolean, NFT) => { },
}



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