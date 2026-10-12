
import { useState } from 'react'
import './ExpenseList.css'

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  const [editingIndex, setEditingIndex] = useState(null)

  const [editTitle, setEditTitle] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [editCategory, setEditCategory] = useState('')

  function startEdit(expense, index) {
    setEditingIndex(index)
    setEditTitle(expense.title)
    setEditAmount(expense.amount)
    setEditCategory(expense.category)
  }

  function handleUpdate(e) {
    e.preventDefault()

    const updatedExpense = {
      title: editTitle,
      amount: editAmount,
      category: editCategory
    }

    onEditExpense(editingIndex, updatedExpense)

    setEditingIndex(null)
  }

  return (
    <section className="expense-list">
      <h2>Recent Expenses</h2>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <h3>No expenses yet</h3>
          <p>Start by adding your first expense.</p>
        </div>
      ) : (
        expenses.map((expense, index) => (
          <div className="expense-item" key={expense._id}>
            {editingIndex === index ? (
              <form className="edit-form" onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />

                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                   min="1"
                   step="0.01"
                   required
                />

                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="shopping">Shopping</option>
                  <option value="other">Other</option>
                </select>

                <button type="submit">Save</button>
              
                <button
                  type="button"
                  onClick={() => setEditingIndex(null)}
                  required
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="expense-info">
                  <div>
                    <h3>{expense.title}</h3>
                    <p>{expense.category}</p>
                  </div>

                  <strong>₹{expense.amount}</strong>
                </div>

                <div className="expense-actions">
                  <button onClick={() => startEdit(expense, index)}>
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        'Are you sure you want to delete this expense?'
                      )

                      if (confirmed) {
                        onDeleteExpense(expense._id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </section>
  )
}

export default ExpenseList