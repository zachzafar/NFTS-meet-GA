export enum ActionKind {
    SAVE_NFTS = 'SAVE_NFTS',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
    UPDATE_MODAL_STATUS_AND_MODAL_NFT = 'UPDATE_MODAL_STATUS_AND_MODAL_NFT'
}

export interface NFT {
    mint: string;
    parentMintAddresses?: string[];
    name: string,
    image: string,
    description: string,
    DNA: string,
}

export interface Action {
    type: ActionKind;
    payload: any;
}

export interface State {
    userStatus: boolean,
    modalStatus: boolean,
    modalNft: NFT | undefined,
    NFTs: NFT[],
    saveNFTs: (NFTs: NFT[]) => void,
    updateUserStatus: (userStatus: boolean) => void,
    updateModalStatusAndModalNft: (modalStatus: boolean, NFT: NFT | undefined | null) => void,
}