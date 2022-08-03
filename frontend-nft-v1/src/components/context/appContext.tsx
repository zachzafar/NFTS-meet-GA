import React, {createContext,useReducer, useContext} from 'react';
import appReducer,{ initialState} from './appReducer';
import {ActionKind,NFT} from '../types/types'
export const AppContext = createContext(initialState);

type ContextProviderProps = {
    children: React.ReactNode
}
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

const useAppContext = () => {
    const context = useContext(AppContext)
    if(context === undefined) {
        throw new Error("useAppContext must be witin AppContext provider")
    }
    return context;
}

export default useAppContext;