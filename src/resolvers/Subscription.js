const Subscription = {
   

    async post(parent, args, {prisma}) {
     
        return  await prisma.$subscribe.post(

            {  mutation_in: ['CREATED', 'UPDATED'] }
           
        ).node();
     },
    
    
}

module.exports = { Subscription }

