


const Query= {
    async publishedPosts(root, args, {prisma,request}) {
       return await prisma.posts({ where: { published: true } })
     },
    async post(root, args, {prisma,request}) {
     
       return await prisma.post({id: args.id})
    },
    postsByUser(root, args, {prisma,request}) {
      return prisma.user({
        id: args.userId
      }).posts()
    }
  }
module.exports ={Query} ;