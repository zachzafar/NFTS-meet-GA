/**
 * Enum for the kind of actions that can occur with the AppContext hook
 * @property {string} SAVE_NFTS
 * @property {string} UPDATE_USER_STATUS
 * @property {string} UPDATE_MODAL_STATUS_AND_MODAL_NFT
 */
export enum ActionKind {
    SAVE_NFTS = 'SAVE_NFTS',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
    UPDATE_MODAL_STATUS_AND_MODAL_NFT = 'UPDATE_MODAL_STATUS_AND_MODAL_NFT'
}

/**
 * Interface describing how NFT object should be implemented
 * @property {string} mint Represents the mint address of the Nft
 * @property {string[]} parentMintAddresses Represents the mint addresses of the Nfts used in the creation of the Nft
 * @property {string} name Represents the name of the Nft
 * @property {string} image Represents the image url for the associated Nft
 * @property {string} description Represents the description of the Nft
 * @property {string} DNA Represents the the features used to generate the Nft as a list of numbers
 */
export interface NFT {
    mint: string;
    parentMintAddresses?: string[];
    name: string,
    image: string,
    description: string,
    DNA: string,
}

/**
 * Interface describing Actions on the AppContext hook 
 * @property {ActionKind} type Describes type of action to be performed
 * @property {any} payload Object containing new data to update state
 */
export interface Action {
    type: ActionKind;
    payload: any;
}

/**
 * Interface describing the State within the AppContext hook
 * @property {boolean} userStatus Describes the status of a user owning an Nft from the collection as a boolean
 * @property {boolean} modalStatus Describes whether the NFTmodal component should be displayed or not 
 * @property {NFT | undefined} modalNft Represents the NFT object that should populate the NFTmodal component
 * @property {NFT[]} NFTs Represents the NFTs owned by the user that belong to the collection
 * @property {(NFTs: NFT[]) => void} saveNFTs Function which stores data on user Nfts as NFT objects
 * @property {(userStatus: boolean) => void} updateUserStatus Updates the userStatus
 * @property {(modalStatus: boolean, NFT: NFT | undefined | null) => void} updateModalStatusAndModalNft Updates the modalStatus and modalNft
 */
export interface State {
    userStatus: boolean,
    modalStatus: boolean,
    modalNft: NFT | undefined,
    NFTs: NFT[],
    saveNFTs: (NFTs: NFT[]) => void,
    updateUserStatus: (userStatus: boolean) => void,
    updateModalStatusAndModalNft: (modalStatus: boolean, NFT: NFT | undefined | null) => void,
}