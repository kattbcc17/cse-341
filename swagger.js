import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:3000',
};

const outputFile = './swagger.json';
const routes = ['./routes/users.routes.js'];

swaggerAutogen(outputFile, routes, doc);
