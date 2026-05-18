import { faker } from '@faker-js/faker';

export interface User {
      name: string
      username: string
      email: string
      password: string
      confirmPassword: string
}

export function getNewUser() {
      const defaultPassword = '189231'
      return {
            name: faker.person.fullName(),
            username: faker.internet.username().replace(/[.-]/g, ''),
            email: faker.internet.email(),
            password: defaultPassword,
            confirmPassword: defaultPassword
      }
}

export const Users = { 
      validUser: {
            name: "Ale",
            username: "ale",
            password: "123abc"
      },
      wrongPassword: {
            name: "Ale",
            username: "ale",
            password: "123abd"
      },
      userNotFound: {
            name: "Ale",
            username: "not-found",
            password: "123abc"
      },
      emptyFields: {
            name: "Ale",
            username: "",
            password: ""
      },
      missingUsername: {
            name: "Ale",
            username: "",
            password: "123abc"
      },
      missingPassword: {
            name: "Ale",
            username: "ale",
            password: ""
      }
}