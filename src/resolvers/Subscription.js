const Subscription = {
   

    post: {
        subscribe: async (parent, args, {prisma}) => {
          return await prisma.$subscribe
            .post({
              mutation_in: ['CREATED', 'UPDATED'],
            })
            .node()
        },
        resolve: payload => {
          return payload
        },
      },

    // async post(parent, args, {prisma}) {
     
    //     return  await prisma.$subscribe.post(

    //         {  mutation_in: ['CREATED', 'UPDATED'] }
           
    //     ).node();
    //  },
     count: {
        subscribe(parent, args, { prisma,request,PubSub }, info) {
        let count = 0
        setInterval(() => {
        count++
        PubSub.publish('count', {
        count
        })
        }, 1000)
        return PubSub.asyncIterator('count')
        }
        }
    
    
}

module.exports = { Subscription }

