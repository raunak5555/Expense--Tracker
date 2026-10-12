
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

function App() {
  const [expenses, setExpenses] = useState([])

  // MongoDB se expenses load karna
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/expenses'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch expenses')
        }

        const data = await response.json()

        setExpenses(data)
      } catch (error) {
        console.error('Failed to load expenses:', error)
      }
    }

    fetchExpenses()
  }, [])

  async function handleAddExpense(expenseData) {
  try {
    const response = await fetch(
      'http://localhost:5000/api/expenses',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseData)
      }
    )

    if (!response.ok) {
      throw new Error('Failed to add expense')
    }

    const savedExpense = await response.json()

    setExpenses((prevExpenses) => {
      return [...prevExpenses, savedExpense]
    })

  } catch (error) {
    console.error('Failed to add expense:', error)
  }
}

  async function handleDeleteExpense(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete expense')
      }

      setExpenses((prevExpenses) => {
        return prevExpenses.filter(
          (expense) => expense._id !== id
        )
      })
    } catch (error) {
      console.error('Failed to delete expense:', error)
    }
  }


async function handleEditExpense(indexToEdit, updatedExpense) {
  try {
    // Jis expense ko edit karna hai uska MongoDB _id nikalo
    const expenseToEdit = expenses[indexToEdit]

    const response = await fetch(
      `http://localhost:5000/api/expenses/${expenseToEdit._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedExpense)
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update expense')
    }

    const updatedData = await response.json()

    // MongoDB se aaya updated expense React state mein daalo
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense, index) => {
        if (index === indexToEdit) {
          return updatedData
        }

        return expense
      })
    })

  } catch (error) {
    console.error('Failed to update expense:', error)
  }
}



  return (
    <div>
      <Header />

      <Dashboard expenses={expenses} />

      <ExpenseForm
        onAddExpense={handleAddExpense}
      />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={handleDeleteExpense}
        onEditExpense={handleEditExpense}
      />
    </div>
  )
}

export default App

