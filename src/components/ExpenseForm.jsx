import { useState } from 'react'
import './ExpenseForm.css'

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const [titleError, setTitleError] = useState('')
  const [amountError, setAmountError] = useState('')
  const [categoryError, setCategoryError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    let hasError = false

    // Clear previous errors
    setTitleError('')
    setAmountError('')
    setCategoryError('')

    // Title validation
    if (title.trim() === '') {
      setTitleError('Please enter an expense title.')
      hasError = true
    }

    // Amount validation
    if (amount === '') {
      setAmountError('Please enter an amount.')
      hasError = true
    } else if (Number(amount) <= 0) {
      setAmountError('Amount must be greater than 0.')
      hasError = true
    }

    // Category validation
    if (category === '') {
      setCategoryError('Please select a category.')
      hasError = true
    }

    // Stop if there is any error
    if (hasError) {
      return
    }

    // Create expense object
    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category: category
    }

    console.log('FORM SUBMITTED')
    console.log(expenseData)

    // Send expense to App.jsx
    onAddExpense(expenseData)

    // Reset form
    setTitle('')
    setAmount('')
    setCategory('')

    // Reset errors
    setTitleError('')
    setAmountError('')
    setCategoryError('')
  }

  return (
    <section>
      <h2 className="expense-form-title">Add Expense</h2>

      <form className="expense-form" onSubmit={handleSubmit}>

        {/* Title */}
        <div>
          <label>Expense Title</label>

          <input
            type="text"
            placeholder="Enter expense title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setTitleError('')
            }}
            required
          />

          {titleError && (
            <p className="form-error">{titleError}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              setAmountError('')
            }}
            min="1"
            step="0.01"
            required
          />

          {amountError && (
            <p className="form-error">{amountError}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setCategoryError('')
            }}
            required
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>

          {categoryError && (
            <p className="form-error">{categoryError}</p>
          )}
        </div>

        <button type="submit">
          Add Expense
        </button>

      </form>
    </section>
  )
}

export default ExpenseForm