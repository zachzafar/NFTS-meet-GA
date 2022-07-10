export enum ActionKind {
    SAVE_NFTS = 'SAVE_NFTS',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
}

export interface NFT {
  name: string,
  image: string,
  description: string,
}

export interface Action {
    type: ActionKind;
    payload:any;
}

export interface State {
    userStatus: boolean,
    NFTs: NFT[],
    saveNFTs: (NFTs:NFT[]) => void,
    updateUserStatus:(userStatus:boolean) => void ,
}
export const initialState:State = {
    userStatus: false,
    NFTs: [],
    saveNFTs: (NFTs:NFT[]) => {},
    updateUserStatus:(userStatus:boolean) => {},
}



const appReducer = (state:State,action:Action) => {
    const {type,payload} = action;
    switch (type) {
        case ActionKind.SAVE_NFTS:
            return {...state,
            NFTs: payload.NFTs}
        
        case ActionKind.UPDATE_USER_STATUS:
            return {...state,
            userStatus: payload.userStatus}

        default:
            throw new Error(`No case for type ${type} found in appReducer`);
    }
}

export default appReducer;