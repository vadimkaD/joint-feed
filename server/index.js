// import express from "express";
// import cors from "cors";
// import apollo from "apollo-server-express";
// const { ApolloServer, gql } = apollo;
// const app = express();
// app.use(cors());
//
// const schema = gql`
//   type Query {
//     me: User
//     users: [User!]
//     user(id: ID!): User
//   }
//   type User {
//     id: ID!
//     username: String!
//   }
// `;
//
// let users = {
//   1: {
//     id: "1",
//     username: "Robin Wieruch"
//   },
//   2: {
//     id: "2",
//     username: "Dave Davids"
//   }
// };
//
// const me = users[1];
// const resolvers = {
//   Query: {
//     user: (parent, { id }) => {
//       return users[id];
//     },
//     me: () => {
//       return me;
//     },
//     users: () => {
//       return Object.values(users);
//     }
//   }
// };
// const server = new ApolloServer({
//   typeDefs: schema,
//   resolvers
// });
// server.applyMiddleware({ app, path: "/graphql" });
// app.listen({ port: 8000 }, () => {
//   console.log("Apollo Server on http://localhost:8000/graphql");
// });
// //     дано множество целых чисел A и целое сумму С.
// //     Найдите все уникальные комбинации в A которые складываются в эту сумму.
// //     одно и тоже число из множества А можно использовать неограниченное количество раз в комбинации.
// //     элементы множества комбинации [a1 a2 a3 ... ak] должны быть отсортированы в порядке убывания,
// //     сами комбинации должны быть отсортированы в порядке возрастания
// //     если нет возможных комбинаций которая складывается в сумку на выходе должно быть строка "пусто".

function arrSum(arr = []) {
  return arr.reduce((prev, total) => prev + total, 0);
}

function getFilledWithEl(base, sum, el) {
  const _tmp = base.slice();
  while (arrSum(_tmp) < sum) {
    _tmp.push(el);
  }

  while (arrSum(_tmp) > sum) {
    _tmp.pop();
  }

  return _tmp;
}

function getWithRemovedElFromBase(base, el) {
  return base.slice().filter(a => a !== el);
}

function isLastIndex(arr, index) {
  return index === arr.length - 1;
}

function getNextIndexOrNull(arr = [], el) {
  const i = arr.indexOf(el);
  return arr[i + 1] !== undefined ? i + 1 : null;
}

function getArrs(arr = [3, 2, 1], sum = 10) {
  const _tmp = arr.sort((a1, a2) => a2 - a1).filter(el => el <= sum);
  const result = [];

  function calculateBase(base, index = null) {
    const currentLastElem = base[base.length - 1];
    index = index === null ? _tmp.indexOf(currentLastElem) + 1 : index;

    let filledBase = base.slice();

    for (let i = index; i < _tmp.length; i++) {
      filledBase = getFilledWithEl(filledBase, sum, _tmp[i]);

      if (arrSum(filledBase) === sum) {
        result.push(filledBase.slice());
      }

      if (!isLastIndex(_tmp, i)) {
        if (arrSum(base) === arrSum(filledBase)) {
          continue;
        } else {
          calculateBase(filledBase.slice(), i);
        }
      } else {
        if (!base.length) return;

        filledBase = getWithRemovedElFromBase(filledBase, _tmp[i]);
        const nextIndex = getNextIndexOrNull(_tmp, filledBase.pop());
        calculateBase(filledBase.slice(), nextIndex);
      }
    }
  }

  const initialBase = getFilledWithEl([], sum, _tmp[0]);

  calculateBase(initialBase);

  return [...new Set(result.map(v => JSON.stringify(v)))].map(v =>
    JSON.parse(v)
  );
}

console.log(getArrs());
