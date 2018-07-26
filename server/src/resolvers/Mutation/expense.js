const { getUserId } = require('../../utils')

const expense = {
  async setExpense(parent, { exp_name, exp_amt }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createExpense(
      {
        data: {
          exp_name,
          exp_amt,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

  async reviseExpense(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const expenseExists = await ctx.db.exists.Expense({
      id,
      author: { id: userId },
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
    const userId = getUserId(ctx)
    const expenseExists = await ctx.db.exists.Expense({
      id,
      author: { id: userId },
    })
    if (!expenseExists) {
      throw new Error(`Expense not found or you're not the author`)
    }

    return ctx.db.mutation.deleteExpense({ where: { id } })
  },
}

module.exports = { expense }
