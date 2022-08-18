import React,{useEffect} from 'react';
import { render, screen } from '@testing-library/react';
import useAppContext,{AppProvider} from './appContext'
import { NFT } from '../types/types';


const TestingComponent1 = () =>{
    const {userStatus,modalStatus,NFTs,modalNft} = useAppContext();

    return (
        <div>
        <p data-testid="testing-userStatus">{userStatus.toString()}</p>
        <p data-testid="testing-modalStatus">{modalStatus.toString()}</p>
        <p data-testid="testing-NFTs">{NFTs.length.toString()}</p>
        <p data-testid="testing-modalNft">{modalNft === undefined ? 'empty' : 'full'}</p>
        </div>
    )
}


const TestingComponent2 = () =>{
    const {saveNFTs,updateModalStatusAndModalNft,updateUserStatus,userStatus,modalStatus,NFTs,modalNft} = useAppContext();
    
    const testNFT:NFT = {
        mint:'3478f9y7y8738u4f8fu84jf8j8fj48uf83u9u94uf',
        name:'dummyNFT',
        image:'http://imagerandom.com/image1',
        description:'testNft',
        DNA: '1,2,3,4,5,6,7,8,9,0,1,2,3,4'
    }
    useEffect(() => {
        updateUserStatus(true)
        updateModalStatusAndModalNft(true,testNFT)
        saveNFTs([testNFT])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    


    return (<div>
        <p data-testid="testing-userStatus">{userStatus.toString()}</p>
        <p data-testid="testing-modalStatus">{modalStatus.toString()}</p>
        <p data-testid="testing-NFTs">{NFTs.length.toString()}</p>
        <p data-testid="testing-modalNft">{modalNft === undefined || modalNft === null ? 'empty' : 'full'}</p>
        </div>)
}




test('check to make sure the inital state of the context provider is as expected',() =>{
    render(<AppProvider>
            <TestingComponent1/>
            </AppProvider>)
    const userStatus = screen.getByTestId('testing-userStatus')
    const modalStatus = screen.getByTestId('testing-modalStatus')
    const NFTs = screen.getByTestId('testing-NFTs')
    const modalNft = screen.getByTestId('testing-modalNft')
    expect(userStatus.textContent).toBe('false')
    expect(modalStatus.textContent).toBe('false')
    expect(NFTs.textContent).toBe('0')
    expect(modalNft.textContent).toBe('empty')
})


test('context can be updated correctly',() =>{
    render(<AppProvider>
        <TestingComponent2/>
        </AppProvider>)
    const userStatus = screen.getByTestId('testing-userStatus')
    const modalStatus = screen.getByTestId('testing-modalStatus')
    const NFTs = screen.getByTestId('testing-NFTs')
    const modalNft = screen.getByTestId('testing-modalNft')
    expect(userStatus.textContent).toBe('true')
    expect(modalStatus.textContent).toBe('true')
    expect(NFTs.textContent).toBe('1')
    expect(modalNft.textContent).toBe('full')
})