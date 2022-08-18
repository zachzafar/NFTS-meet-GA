import React, { useEffect } from 'react';
import { fireEvent, render, screen} from '@testing-library/react';
import useAppContext, {AppProvider} from '../context/appContext'
import { NFT } from '../types/types';
import Evolve from '../Evolve';
import App from '../../App';


const TestingComponent1 = () =>{
    const {saveNFTs} = useAppContext();
    
    const testNFTs:NFT[] = [{
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5'
    } ,
    {
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '1,2,3,4,5,6,7,8,9,0,1,2,3,4,5'
    }  
    ]


    useEffect(() => {
        saveNFTs(testNFTs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (<>
     <Evolve/>
    </>) 
}

const TestingComponent2 = () =>{
    const {saveNFTs,updateUserStatus} = useAppContext();
    
    const testNFTs:NFT[] = [{
        mint:'HHopQYGyA3NK74CpGZvHXAN7W2uLSLedb7BDW7vySLV3',
        name:'DudesOnChain',
        image:'https://zf32fs6a3wbk72vzwncq2yvwdk6gee2u2c455s7q4ny5b23mirka.arweave.net/yXeiy8Ddgq_qubNFDWK2GrxiE1TQud7L8ONx0OtsRFQ?ext=png',
        description:'DudesOnChain',
        DNA: '3,7,4,0,30,9,0,14,8,26,1,6,2,22,-1'
    } ,
    {
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

test('render images in sidebar and no place holder cards render showing error message',  () => {
    render(<AppProvider>
        <TestingComponent1/>
        </AppProvider>)

    const sidebar =  screen.queryByTestId('evolve-sidebar')
    const sidebarImages = screen.getAllByAltText('dude')
    const errorMessage = screen.getByTestId('error-message')
    expect(sidebar).not.toBeNull()
    expect(sidebarImages.length).toBe(2)
    expect(errorMessage.textContent).toBe('Hmm something wrong here')
})


test('Check user can navigate to Evolve which then renders as expected and can switch between crossover and mutate correctly',  () => {
  render(<AppProvider>
    <TestingComponent2/>
    </AppProvider>)
  const holdersbutton = screen.getByTestId('holders-button')
  fireEvent.click(holdersbutton)
  const evolvebutton  = screen.getByTestId('evolve-button')
  fireEvent.click(evolvebutton)
  const parent1placeholder = screen.queryByTestId('emptyparent1Image')
  const parent2placeholder = screen.queryByTestId('emptyparent2Image')
  const child1placeholder  = screen.queryByTestId('emptychild1Image')
  const child2placeholder  = screen.queryByTestId('emptychild2Image')
  const sidebarImages = screen.getAllByAltText('dude')
  const sidebar =  screen.queryByTestId('evolve-sidebar')
  const imageButtons = screen.getAllByTestId('dude-imagebutton')
  expect(parent1placeholder).not.toBeNull()
  expect(parent2placeholder).not.toBeNull()
  expect(child1placeholder).not.toBeNull()
  expect(child2placeholder).not.toBeNull()
  expect(sidebar).not.toBeNull()
  expect(sidebarImages.length).toBe(2)
  fireEvent.click(imageButtons[0])
  fireEvent.click(imageButtons[1])
  const parent1 = screen.queryByAltText('parent1')
  const parent2 = screen.queryByAltText('parent2')
  expect(parent1).not.toBeNull()
  expect(parent2).not.toBeNull()
  const mutatebutton = screen.getByTestId('mutate-button')
  fireEvent.click(mutatebutton)
  const parentplaceholder = screen.queryByTestId('emptyparentImage')
  const childplaceholder = screen.queryByTestId('emptychildImage')
  expect(parentplaceholder).not.toBeNull()
  expect(childplaceholder).not.toBeNull()
  fireEvent.click(imageButtons[0])
  const parent = screen.queryByAltText('parent')
  expect(parent).not.toBeNull()
})