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

const initialUserInput = {
  'current-savings': 10000,
  'yearly-contribution': 1200,
  'expected-return': 7,
  'duration': 10
}

const Form = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput)

  const submitHandler = (event) => {
    event.preventDefault()
    props.onCalculate(userInput)
  }
  const resetHandler = (event) => {
    setUserInput(initialUserInput)
  }
  const changeHandler = (input, value) => {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      }
    })
  }
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(event) =>
              changeHandler('current-savings', event.target.value)}
            value={userInput['current-savings']}
            type="number"
            id="current-savings"
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              changeHandler('yearly-contribution', event.target.value)}
            value={userInput['yearly-contribution']}
            type="number"
            id="yearly-contribution" />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              changeHandler('expected-return', event.target.value)}
            value={userInput['expected-return']}
            type="number"
            id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(event) =>
              changeHandler('duration', event.target.value)}
            value={userInput['duration']}
            type="number"
            id="duration" />
        </p>
      </div>
      <p className="actions">
        <button
          onClick={resetHandler}
          type="reset"
          className="buttonAlt"
        >
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  )
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Results = (props) => {
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
        {props.data.map((yearData) => (
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.savingsEndOfYear)}</td>
            <td>{formatter.format(yearData.yearlyInterest)}</td>
            <td>
              {formatter.format(
                yearData.savingsEndOfYear -
                  props.initialInvestment -
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
            <td>
              {formatter.format(
                props.initialInvestment +
                  yearData.yearlyContribution * yearData.year
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [userInput, setUserInput] = useState(null)

  const calculateHandler = (userInput) => {
    setUserInput(userInput)
  }

  const yearlyData = []

  if (userInput) {
    let currentSavings = +userInput['current-savings']
    const yearlyContribution = +userInput['yearly-contribution']
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }


  return (
    <div>
      <Header logo={logo} />
      <Form onCalculate={calculateHandler} />

      {!userInput && <p style={{textAlign: 'center'}} >No investment calculated yet.</p>}
      {userInput && <Results data={yearlyData} initialInvestment={userInput['current-savings']} />}
    </div>
  );
}
export default App;
