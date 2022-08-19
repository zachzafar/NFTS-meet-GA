import { fireEvent,render,screen } from "@testing-library/react";
import { useEffect } from "react";
import App from "../../App";
import useAppContext, { AppProvider } from "../context/appContext";
import { NFT } from "../types/types";

const TestingComponent = () =>{
    const {saveNFTs,updateUserStatus} = useAppContext();
    
    const testNFTs:NFT[] = [{
        parentMintAddresses:['HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3','HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3'],
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '3,7,4,0,30,9,0,14,8,26,1,6,2,22,-1'
    } ,
    {
        parentMintAddresses:['HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3','HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3'],
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '3,7,4,0,30,9,0,14,8,26,1,6,2,22,-1'
    }  
    ]


    useEffect(() => {
        updateUserStatus(true)
        saveNFTs(testNFTs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
     <App/>
    </>) 
}


test('FamilyTree component renders correctly when NFTCard component is clicked', async () => {
  render(<AppProvider>
    <TestingComponent/>
    </AppProvider>)
  const holdersbutton = screen.getByTestId('holders-button')
  fireEvent.click(holdersbutton)
  const NFTcards = screen.getAllByTestId('nft-card')
  fireEvent.click(NFTcards[0])
  const modal = screen.getByAltText('modal-dude')
  expect(modal).not.toBeNull()
  const FTbutton = screen.getByTestId('familytree-button')
  fireEvent.click(FTbutton)
  const FTscreen = screen.queryByTestId('familytree-screen')
  expect(FTscreen).not.toBeNull()
  const familyMembers = await screen.findAllByTestId('nft-card')
  expect(familyMembers.length).not.toBe(0)
  expect(familyMembers).not.toBe(1)
})