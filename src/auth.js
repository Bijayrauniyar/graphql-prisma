const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authPayload = require('./AuthPayload');

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10)
    console.log(ctx);
    const user = await ctx.prisma.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: jwt.sign({ userId: user.id }, 'my-secret-text'),
      user,
    }
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.prisma.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    return {
      token: jwt.sign({ userId: user.id }, 'my-secret-text'),
      user,
    }
  },
}

module.exports = { auth }