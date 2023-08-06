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

  const submitHandler = () => {
    console.log('SUBMIT')
    props.onCalculate()
  }
  const resetHandler = () => {
    console.log('RESET')
    setUserInput(initialUserInput)
  }
  const changeHandler = (input, value) => {
    console.log(input, value)
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
          <input onChange={(event) =>
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
          <input onChange={(event) =>
            changeHandler('expected-return', event.target.value)}
            value={userInput['expected-return']}
            type="number"
            id="expected-return" />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input onChange={(event) =>
            changeHandler('duration', event.target.value)}
            value={userInput['duration']}
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

const Result = (props) => {
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
        {props.data.map(yearData =>
          <tr>
            <td>{yearData.year}</td>
            <td>{yearData.savingsEndOfYear}</td>
            <td>{yearData.yearlyInterest}</td>
            <td>{yearData.savingsEndOfYear}</td>
            <td>TOTAL INVESTED CAPITAL</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

function App() {
  const [userInput, setUserInput] = useState(null)

  const calculateHandler = (userInput) => {
    setUserInput(userInput)
  }

  const yearlyData = []; // per-year results

  if (userInput) {
    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

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
  }


  return (
    <div>
      <Header logo={logo} />
      <Form onCalculate={calculateHandler} />

      {!userInput && <p>No investment calculated yet.</p>}
      {userInput && <Result data={yearlyData} />}
    </div>
  );
}
export default App;
