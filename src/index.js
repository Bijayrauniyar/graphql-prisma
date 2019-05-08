const  jwt =  require("jsonwebtoken") ;
const {prisma} = require('../prisma/generated/prisma-client')
const { GraphQLServer,PubSub } = require('graphql-yoga');
const  bcrypt = require('bcryptjs');
const {getUserId} = require('./utils/getUserId');
const {Query} = require('./resolvers/Query');
const {Mutation} = require('./resolvers/Mutation');
const {Subscription} = require('./resolvers/Subscription');
const {User} = require('./resolvers/User');
const {Post} = require('./resolvers/Post');
//import getUserId from '../utils/getUserId'
//const {auth} = require ('./auth');
//import { AuthenticationError } from "apollo-server-core";



 const resolvers = {
 Query: Query
 // {
  //   async publishedPosts(root, args, {prisma,request}) {
  //      return await prisma.posts({ where: { published: true } })
  //    },
  //   async post(root, args, {prisma,request}) {
     
  //      return await prisma.post({id: args.id})
  //   },
  //   postsByUser(root, args, {prisma,request}) {
  //     return prisma.user({
  //       id: args.userId
  //     }).posts()
  //   }
  // }
  ,
  
   Mutation: Mutation 
   //{

  //   async signup(parent, args, { prisma }, info) {
  //     if (args.data.password.length < 8) {
  //         throw new Error('Password must be 8 characters or longer.')
  //     }

  //     const password = await bcrypt.hash(args.data.password, 10)
    
  //     const user = await prisma.createUser({
        
  //             ...args.data,
  //             password
          
  //     })

       
  //     return {
  //         user,
  //         token: jwt.sign({ userId: user.id }, 'thisisasecret')
  //     }
  // },
  // async login(parent, args, { prisma }, info) {
  //     const user = await prisma.user({
  //             email: args.data.email
  //     })

  //     if (!user) {
  //         throw new Error('Unable to login')
  //     }

  //     const isMatch = await bcrypt.compare(args.data.password, user.password)

  //     if (!isMatch) {
  //         throw new Error('Unable to login')
  //     }

  //     return {
  //         user,
  //         token: jwt.sign({ userId: user.id }, 'thisisasecret')
  //     }
  // },  
  //   createDraft(root, args, {prisma,request}) {
  //     const userId = getUserId(request)
  //     // if (!userId){
  //     //   throw new Error('login failed')
  //     // }
  //     return prisma.createPost(
  //       {
  //         title: args.title,
  //         author: {
  //           connect: { id: userId }
  //         }
  //       }

  //     )
  //   },



  //   async updatePost(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const postExists = await prisma.post({
  //         id: args.id
  //     })

  //      console.log(postExists);
  //     if (!postExists) {
  //         throw new Error('Unable to update post')
  //     }

  //     return prisma.updatePost({
  //         where: {
  //             id: args.id
  //         },
  //         data: args.data
  //     }, info)
  // },
  
  //   // publish(root, args, {prisma,request}) {

  //   //   const userId = getUserId(request)
  //   //   // if (!userId){
  //   //   //   throw new Error('login failed')
  //   //   // }

  //   //   return prisma.updatePost(
  //   //     {
  //   //       where: { id: args.postId },
  //   //       data: { published: true },
  //   //     },

  //   //   )
  //   // },
   
  // }
  ,
  Subscription: Subscription
  ,
  Post: Post,
  User: User
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context(request) {
    return {
        prisma,
        request,
        PubSub
    }
}
 
  
})
 server.start(() => console.log('Server is running on http://localhost:4000'))









// //mongodb+srv://bj-mangodb:toIyreW2Iilu3RxP@node-rest-shop-se6sv.mongodb.net/prisma?retryWrites=true

//  const { prisma } = require('../generated/prisma-client')
//  const { GraphQLServer } = require('graphql-yoga')
//  const {auth} = require ('./auth');
//  const {authPayLoad} = require('./AuthPayload');

// // mongo:
// image: mongo:3.6
// restart: always
// environment:
//   MONGO_INITDB_ROOT_USERNAME: prisma
//   MONGO_INITDB_ROOT_PASSWORD: prisma
// ports:
//   - "27017:27017"
// volumes:
//   - mongo:/var/lib/mongo
// volumes:
// mongo: