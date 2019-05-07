# graphql-prisma

steps to run project

1.Install the Prisma CLI
 npm install -g prisma
 
2.Install Docker 
https://docs.docker.com/v17.09/toolbox/toolbox_install_windows/

3.Launch Prisma and the connected database
To start Prisma and launch the connected database, run the following command:
docker-compose up -d

4. Now deploy the Prisma API with the following command:
prisma deploy

You can now start using the Prisma client to talk to your database from code.
