/**
 * This context provider is used to manage state across the application, it manages the:
 * {boolean} userStatus(whether or not the user has an Nft from the collection)
 * {boolean} modalStatus(whether or not the NFTModal should be rendered or not)
 * {NFT} modalNFT(The NFT which will be used to populate the modal)
 * {NFT[]} NFTs(A list of NFTs in the users gallery)
 */
import React, {createContext,useReducer, useContext} from 'react';
import appReducer,{ initialState} from './appReducer';
import {ActionKind,NFT, State} from '../types/types'
export const AppContext = createContext(initialState);

type ContextProviderProps = {
    children: React.ReactNode
}

/**
 * Provides access to variables and functions within the State of the Context provider
 * @param {ContextProviderProps} children 
 */
export  const AppProvider = ({children}:ContextProviderProps) => {
    const [state,dispatch] = useReducer(appReducer,initialState);   

    const saveNFTs = (NFTs:NFT[]) => {
        dispatch({type:ActionKind.SAVE_NFTS,payload: {NFTs: NFTs}});
    }

    const updateUserStatus = (userStatus:boolean) => {
        dispatch({type:ActionKind.UPDATE_USER_STATUS, payload: {userStatus: userStatus}});
    }

    const updateModalStatusAndModalNft = (modalStatus:boolean,modalNft:NFT | undefined | null) => {
        if(modalNft === undefined) modalNft = undefined;
        if(modalNft === null) modalNft = state.modalNft
        dispatch({type:ActionKind.UPDATE_MODAL_STATUS_AND_MODAL_NFT, payload: {modalStatus: modalStatus,modalNft: modalNft}});
    }

    const value = {
        userStatus: state.userStatus,
        modalStatus: state.modalStatus,
        modalNft: state.modalNft,
        NFTs: state.NFTs,
        saveNFTs,
        updateUserStatus,
        updateModalStatusAndModalNft
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/**
 * Returns AppContext
 * @returns {State}
 */
const useAppContext = (): State => {
    const context = useContext(AppContext)
    if(context === undefined) {
        throw new Error("useAppContext must be witin AppContext provider")
    }
    return context;
}

export default useAppContext;