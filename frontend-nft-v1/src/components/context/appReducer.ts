import { ActionKind, State, Action, NFT } from '../types/types'

export const initialState: State = {
    userStatus: false,
    NFTs: [],
    saveNFTs: (NFTs: NFT[]) => { },
    updateUserStatus: (userStatus: boolean) => { },
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

        default:
            throw new Error(`No case for type ${type} found in appReducer`);
    }
}

export default appReducer;