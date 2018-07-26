const { getUserId } = require('../../utils')

const category = {
  async setCategory(parent, { category_name }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createCategory(
      {
        data: {
          category_name,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

  async reviseCategory(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const categoryExists = await ctx.db.exists.Category({
      id,
      author: { id: userId },
    })
    if (!categoryExists) {
      throw new Error(`Category not found or you're not the author`)
    }

    return ctx.db.mutation.updateCategory(
      {
        where: { id },
        data: { category_name: "someNewCategory" },
      },
      info,
    )
  },

  async removeCategory(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const categoryExists = await ctx.db.exists.Category({
      id,
      author: { id: userId },
    })
    if (!categoryExists) {
      throw new Error(`Category not found or you're not the author`)
    }

    return ctx.db.mutation.deleteCategory({ where: { id } })
  },
}

module.exports = { category }
