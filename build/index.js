"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const persons = [
    {
        name: 'Arto Hellas',
        phone: '040-123543',
        street: 'Tapiolankatu 5 A',
        city: 'Espoo',
        id: '3d594650-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Matti Luukkainen',
        phone: '040-432342',
        street: 'Malminkaari 10 A',
        city: 'Helsinki',
        id: '3d599470-3436-11e9-bc57-8b80ba54c431',
    },
    {
        name: 'Venla Ruuska',
        street: 'Nallemäentie 22 C',
        city: 'Helsinki',
        id: '3d599471-3436-11e9-bc57-8b80ba54c431',
    },
];
const typeDefs = `
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`;
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
});
void startServer();
