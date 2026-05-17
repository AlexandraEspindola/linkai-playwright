import { faker } from '@faker-js/faker';

export interface User {
      name: string
      username: string
      email: string
      password: string
}

export function getNewUser() {
      return {
            name: faker.person.fullName(),
            username: faker.internet.username().replace(/[.-]/g, ''),
            email: faker.internet.email(),
            password: "123456"
      }
}

export const Users = { 
      validUser: {
            name: "Ale",
            username: "ale",
            password: "189231"
      },
      wrongPassword: {
            name: "Ale",
            username: "ale",
            password: "123456"
      },
      userNotFound: {
            name: "Ale",
            username: "not-found",
            password: "189231"
      },
      emptyFields: {
            name: "Ale",
            username: "",
            password: ""
      },
      missingUsername: {
            name: "Ale",
            username: "",
            password: "189231"
      },
      missingPassword: {
            name: "Ale",
            username: "ale",
            password: ""
      }
}