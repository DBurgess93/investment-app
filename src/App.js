import logo from './assets/investment-calculator-logo.png';
import { useState } from 'react'

const Header = (props) => {
  return (
    <header className="header">
      <img src={props.logo} alt="logo" />
      <h1>Investment Calculator</h1>
    </header>
  )
}

const Form = () => {
  const submitHandler = () => {
    console.log('SUBMIT')
  }
  const resetHandler = () => {
    console.log('RESET')
  }
  const changeHandler = (input, value) => {
    console.log(input, value)
  }
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              changeHandler('current-savings', event.target.value)}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input onChange={(event) =>
            changeHandler('yearly-contribution', event.target.value)}
            type="number"
            id="yearly-contribution" />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input onChange={(event) =>
            changeHandler('expected-return', event.target.value)}
            type="number"
            id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input onChange={(event) =>
            changeHandler('duration', event.target.value)}
            type="number"
            id="duration" />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  )
}

const Result = () => {
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>YEAR NUMBER</td>
          <td>TOTAL SAVINGS END OF YEAR</td>
          <td>INTEREST GAINED IN YEAR</td>
          <td>TOTAL INTEREST GAINED</td>
          <td>TOTAL INVESTED CAPITAL</td>
        </tr>
      </tbody>
    </table>
  )
}

function App() {
  const [currentSavings, setCurrentSavings] = useState('')
  const [yearlyContribution, setyearlyContribution] = useState('')
  const [expectedReturn, setExpectedReturn] = useState('')
  const [duration, setDuration] = useState('')

  const amountChangeHandler = (event) => {
    setCurrentSavings(event.target.value)
    console.log(currentSavings)
  }

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    setCurrentSavings(+userInput['current-savings']); // feel free to change the shape of this input object!
    setyearlyContribution(+userInput['yearly-contribution']); // as mentioned: feel free to change the shape...
    setExpectedReturn(+userInput['expected-return'] / 100);
    setDuration(+userInput['duration']);

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    // do something with yearlyData ...
  };

  return (
    <div>
      <Header logo={logo} />
      <Form amountChangeHandler={amountChangeHandler} calculateHandler={calculateHandler} />
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      <Result />
    </div>
  );
}

export default App;
