const typeDefs = `#graphql

type User {
  user_id: ID
  username: String
  email: String
  password: String
  phone_number: String
  company: String
  address: String
  city: String
  is_public: Boolean
}

type LoginResult {
  status: Int
  token: String
}

type RegisterResult {
  status: Int
  message: String
  user: User
}

input InputUser {
  username: String
  email: String
  password: String
  phone_number: String
  company: String
  address: String
  city: String
  is_public: Boolean

}

type Subscription {
  userCreated: RegisterResult
  userLogin: LoginResult
}

type Query {
  getUser(id: ID!): User
}

type Mutation {
  register(user: InputUser): RegisterResult
  loginUser(user: InputUser): LoginResult
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

const usersTypes = typeDefs ;

export default usersTypes;

