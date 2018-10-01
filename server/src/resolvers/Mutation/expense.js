const { getBudgetId } = require('../../utils')

const expense = {
  async setExpense(parent, { exp_name, exp_amt }, ctx, info) {
    const budgetId = getBudgetId(ctx)
    return ctx.db.mutation.createExpense(
      {
        data: {
          exp_name,
          exp_amt,
          author: {
            connect: { id: budgetId },
          },
        },
      },
      info
    )
  },

  async reviseExpense(parent, { id }, ctx, info) {
    const budgetId = getBudgetId(ctx)
    const expenseExists = await ctx.db.exists.Expense({
      id,
      author: { id: budgetId },
    })
    if (!expenseExists) {
      throw new Error(`Expense not found or you're not the author`)
    }

    return ctx.db.mutation.updateExpense(
      {
        where: { id },
        data: { exp_name: "someNewCategory" },
      },
      info,
    )
  },

  async removeExpense(parent, { id }, ctx, info) {
    const budgetId = getBudgetId(ctx)
    const expenseExists = await ctx.db.exists.Expense({
      id,
      author: { id: budgetId },
    })
    if (!expenseExists) {
      throw new Error(`Expense not found or you're not the author`)
    }

    return ctx.db.mutation.deleteExpense({ where: { id } })
  },
}

module.exports = { expense }
