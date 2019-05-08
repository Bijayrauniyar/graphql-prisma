const {getUserId} = require('../utils/getUserId');

const Mutation ={

    async signup(parent, args, { prisma }, info) {
      if (args.data.password.length < 8) {
          throw new Error('Password must be 8 characters or longer.')
      }

      const password = await bcrypt.hash(args.data.password, 10)
    
      const user = await prisma.createUser({
        
              ...args.data,
              password
          
      })

       
      return {
          user,
          token: jwt.sign({ userId: user.id }, 'thisisasecret')
      }
  },
  async login(parent, args, { prisma }, info) {
      const user = await prisma.user({
              email: args.data.email
      })

      if (!user) {
          throw new Error('Unable to login')
      }

      const isMatch = await bcrypt.compare(args.data.password, user.password)

      if (!isMatch) {
          throw new Error('Unable to login')
      }

      return {
          user,
          token: jwt.sign({ userId: user.id }, 'thisisasecret')
      }
  },  
    createDraft(root, args, {prisma,request}) {
      const userId = getUserId(request)
      // if (!userId){
      //   throw new Error('login failed')
      // }
      return prisma.createPost(
        {
          title: args.title,
          author: {
            connect: { id: userId }
          }
        }

      )
    },



    async updatePost(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)
      const postExists = await prisma.post({
          id: args.id
      })

       console.log(postExists);
      if (!postExists) {
          throw new Error('Unable to update post')
      }

      return prisma.updatePost({
          where: {
              id: args.id
          },
          data: args.data
      }, info)
  }
}

module.exports ={Mutation};