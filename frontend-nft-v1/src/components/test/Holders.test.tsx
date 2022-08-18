import React, { useEffect } from 'react';
import { render, screen} from '@testing-library/react';
import Holders from '../Holders';
import useAppContext, {AppProvider} from '../context/appContext'
import { NFT } from '../types/types';

const TestingComponent1 = () =>{
    const {saveNFTs,updateUserStatus,userStatus} = useAppContext();
    
    const testNFT:NFT = {
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5'
    }
    useEffect(() => {
        updateUserStatus(true)
        saveNFTs([testNFT])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
    {userStatus ? <Holders/> : null}
    </>)
}

test('renders login screen only', () => {
    render(<Holders/>)
    const login = screen.queryByTestId('login-screen')
    expect(login).not.toBeNull()
})


test('login to gallery and display dudes',async () =>{
    render(<AppProvider>
            <TestingComponent1/>
            </AppProvider>)
    const gallery =  await screen.findByTestId('gallery-screen')
    const NFTcards = screen.getAllByTestId('nft-card')
    expect(gallery).not.toBeNull()
    expect(NFTcards.length).toBe(1)
})