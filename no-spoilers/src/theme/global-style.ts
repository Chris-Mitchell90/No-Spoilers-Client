import styled, { createGlobalStyle } from 'styled-components';

/**
 * Hi Boys, let's keep global variables in here!
 * + '--' before a property makes it a variable
 * + use in app like: color: var(--color-red)
 * + Put @import statements (for fonts) in the App.css file, for reason I didn't have time to read
 * 

 */

const GlobalStyles = createGlobalStyle`

  html {
    --bg-color: #050214;
    --navbar-color: #1b2530;
    --main-font: 'Poppins', sans-serif;
    
    // TYPO: "chatbox"/"chatlist" below means forum... So sorry guys, I've   
    // used the variables so many times arcoss different components that 
    // it might be too late to change the names now ...
    
    --chatbox-color: #2D3748;
    --chatbox-border: #718096;
    --chatbox-wrd: #cbd5e0;
    --light-purple: #5d5fef;
    --sharp-purple: #7B61ff;
    --chatlist-wrd: #c6cbd2;
    --score-font: 'Inter', sans-serif;
    --messagebox-border: #162b2e;
  }

`;

export default GlobalStyles;
