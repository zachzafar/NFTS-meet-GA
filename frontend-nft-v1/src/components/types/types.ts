export enum ActionKind {
    SAVE_NFTS = 'SAVE_NFTS',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
}

export interface NFT {
    name: string,
    image: string,
    description: string,
    DNA?: number[]
}

export interface Action {
    type: ActionKind;
    payload: any;
}

export interface State {
    userStatus: boolean,
    NFTs: NFT[],
    saveNFTs: (NFTs: NFT[]) => void,
    updateUserStatus: (userStatus: boolean) => void,
}