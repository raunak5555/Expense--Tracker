import './Dashboard.css'

function Dashboard({ expenses }) {
  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + Number(expense.amount)
  }, 0)
  const expenseCount = expenses.length

  function getCategoryTotal(category) {
  return expenses
    .filter((expense) => expense.category === category)
    .reduce((sum, expense) => {
      return sum + Number(expense.amount)
    }, 0)
}

  return (
  <section>
    <h2>Dashboard</h2>

    <div className="dashboard-cards">

      <div>
        <h3>Total Expenses</h3>
        <p>₹{totalExpenses}</p>
      </div>

      <div>
        <h3>Number of Expenses</h3>
        <p>{expenseCount}</p>
      </div>

      <div>
        <h3>Food</h3>
        <p>₹{getCategoryTotal('food')}</p>
      </div>

      <div>
        <h3>Travel</h3>
        <p>₹{getCategoryTotal('travel')}</p>
      </div>

      <div>
        <h3>Shopping</h3>
        <p>₹{getCategoryTotal('shopping')}</p>
      </div>

      <div>
        <h3>Other</h3>
        <p>₹{getCategoryTotal('other')}</p>
      </div>

    </div>
  </section>
)
}

export default Dashboard