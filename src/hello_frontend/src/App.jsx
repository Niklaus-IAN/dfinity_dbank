import { useEffect, useState, useRef } from 'react';
import { hello_backend } from '../../declarations/hello_backend';

function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const name = event.target.elements.name.value;
  //   hello_backend.greet(name).then((greeting) => {
  //     setGreeting(greeting);
  //   });
  //   return false;
  // }

  // window.addEventListener("load", async function(){
  //   // console.log('Finished Loading');
  //   const currentAmount = await hello_backend.checkBalance();
  //   this.document.getElementById("value").innerText = currentAmount.toFixed(2);
  //   // this.document.getElementById("value").innerText = Math.round(currentAmount);
  // });


  async function fetchBalance() {
    console.log('I Ran!!');
    const currentAmount = await hello_backend.checkBalance();
    const valueElement = document.getElementById("value");
    if (valueElement) {
      valueElement.innerText = currentAmount.toFixed(2);
      // or Math.round(currentAmount) if you prefer
    }
  }

  useEffect(() => {
    // Equivalent of "window.onload"
    // async function fetchBalance() {
    //   const currentAmount = await hello_backend.checkBalance();
    //   const valueElement = document.getElementById("value");
    //   if (valueElement) {
    //     valueElement.innerText = currentAmount.toFixed(2);
    //     // or Math.round(currentAmount) if you prefer
    //   }
    // }

    fetchBalance();
  }, []); // Empty array = run once after first render (like window.onload)


  // # -- for ID
  // . -- for class
  // Call the Name -- HTML Element


  // document.querySelector("form").addEventListener("submit", async function (event) {
  //   console.log("Submitted.");
  // });

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted.");

    const button = event.target.querySelector('#submit-btn');

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value != 0) {
      await hello_backend.topUp(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value != 0) {
      await hello_backend.withdrawal(outputAmount);
    }


    await hello_backend.compounding();
    

    fetchBalance();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  }

  return (
    // <main>
    //   <img src="/logo2.svg" alt="DFINITY logo" />
    //   <br />
    //   <br />
    //   <form action="#" onSubmit={handleSubmit}>
    //     <label htmlFor="name">Enter your name: &nbsp;</label>
    //     <input id="name" alt="Name" type="text" />
    //     <button type="submit">Click Me!</button>
    //   </form>
    //   <section id="greeting">{greeting}</section>
    // </main>

    
    <div className="container">
      <img src="dbank_logo.png" alt="DBank logo" width="100" />
      <h1>
        Current Balance: $<span id="value">234</span>
      </h1>
      <div className="divider"></div>
      <form action="#" onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          min="0"
          name="topUp"
          defaultValue=""
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          name="withdraw"
          step="0.01"
          min="0"
          defaultValue=""
        />
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>
  );
}

export default App;
