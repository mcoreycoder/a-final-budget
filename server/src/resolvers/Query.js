const { getUserId } = require('../utils')

const Query = {
  budgets(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const where = {
      author: {
        id
      }
    }

    return ctx.db.query.budgets({ where }, info)
  },

  categorys(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const where = {
      author: {
        id
      }
    }

    return ctx.db.query.categorys({ where }, info)
  },

  expenses(parent, args, ctx, info) {
    const id = getUserId(ctx)
    const where = {
      author: {
        id
      }
    }

    return ctx.db.query.expenses({ where }, info)
  },

  // drafts(parent, args, ctx, info) {
  //   const id = getUserId(ctx)
  //
  //   const where = {
  //     isPublished: false,
  //     author: {
  //       id
  //     }
  //   }
  //
  //   return ctx.db.query.posts({ where }, info)
  // },

  budget(parent, { id }, ctx, info) {
    return ctx.db.query.budget({ where: { id } }, info)
  },

  category(parent, { id }, ctx, info) {
    return ctx.db.query.category({ where: { id } }, info)
  },

  expense(parent, { id }, ctx, info) {
    return ctx.db.query.expense({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
