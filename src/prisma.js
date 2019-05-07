const  { Prisma }  = require('prisma-binding');

const prisma = new Prisma({
    typeDefs: '/prisma/datamodel.prisma' ,
    endpoint: 'http://192.168.99.100:4466/s2/dev'
    //secret: 'thisismysupersecrettext'
})

module.exports = {prisma}