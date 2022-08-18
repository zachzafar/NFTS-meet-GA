import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';


/**
 * On initial load this test checks to see if the navbar renders as well as the main component.
 * It then checks to see if the the dudes that have been minted from the candy machine are being displayed correctly
 */
test('loads initial page', async () => {
  render(<App />);
  const title = screen.getByTestId('project-title');
  const navbarTitle = screen.getByTestId('navbar-title')
  expect(title.textContent).toBe('Dudesonchain NFT Collection')
  expect(navbarTitle.textContent).toBe('dudesonchain')
  const mintedDudes =  await waitFor(() => screen.findAllByTestId('nft-card'),{timeout:60000})
  expect(mintedDudes.length).not.toBe(0)
}, 70000);

/**
 * Make sure it is possible to Navigate through differrent pages that do not require loging in to the application
 */
test('navigate through all pages that do not require login expect corresponding pages',() =>{
  render(<App/>)
  let holdersbutton = screen.getByTestId('holders-button')
  let mintbutton = screen.getByTestId('mint-button')
  expect(holdersbutton.textContent).toBe('Holders')
  expect(mintbutton.textContent).toBe('Mint')
  fireEvent.click(holdersbutton)
  const login = screen.queryByTestId('login-screen')
  expect(login).not.toBeNull() 
  let homebutton = screen.getByTestId('home-button')
  mintbutton = screen.getByTestId('mint-button')
  expect(mintbutton.textContent).toBe('Mint')
  expect(homebutton.textContent).toBe('Home')
  fireEvent.click(mintbutton)
  let mint = screen.queryByTestId('mint-screen')
  expect(mint).not.toBeNull()
  homebutton = screen.getByTestId('home-button')
  expect(homebutton.textContent).toBe('Home')
  fireEvent.click(homebutton)
  const title = screen.getByTestId('project-title');
  expect(title.textContent).toBe('Dudesonchain NFT Collection');
})





