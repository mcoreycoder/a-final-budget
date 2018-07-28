const { getUserId } = require('../../utils')

const budget = {
  async setBudget(parent, { label, note }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createBudget(
      {
        data: {
          label,
          note,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

  async reviseBudget(parent, { id, label, note }, ctx, info) {
    const userId = getUserId(ctx)
    const budgetExists = await ctx.db.exists.Budget({
      id,
      author: { id: userId },
    })
    if (!budgetExists) {
      throw new Error(`Budget not found or you're not the author`)
    }

    return ctx.db.mutation.updateBudget(
      {
        where: {id},
        data: {
          label,
          note,
        },
      },
      info,
    )
  },

  async removeBudget(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const budgetExists = await ctx.db.exists.Budget({
      id,
      author: { id: userId },
    })
    if (!budgetExists) {
      throw new Error(`Budget not found or you're not the author`)
    }

    return ctx.db.mutation.deleteBudget({ where: { id } })
  },
}

module.exports = { budget }
