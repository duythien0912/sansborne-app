// import React from 'react';
// import { useMachine } from '@xstate/react';
// import { Machine, assign } from 'xstate';
// export const GlobalStateContext = React.createContext();
// export const GlobalDispatchContext = React.createContext();
// const globalMachine = Machine(
//   {
//     id: 'global',
//     initial: 'loggedOut',
//     context: {
//       userData: null,
//     },
//     states: {
//       loggedIn: {
//         on: {
//           LOGOUT: {
//             target: 'loggedOut',
//             actions: 'clearUserData',
//           },
//         },
//       },
//       loggedOut: {
//         on: {
//           LOGIN: {
//             target: 'loggedIn',
//             actions: 'setUserData',
//           },
//         },
//       },
//     },
//   },
//   {
//     actions: {
//       clearUserData: assign({
//         userData: (_ctx, _evt) => null,
//       }),
//       setUserData: assign({
//         userData: (_ctx, evt) => {
//           console.log(_ctx);
//           console.log(evt.value);
//           return evt.value;
//         },
//       }),
//     },
//   }
// );
// export const GlobalContextProvider = ({ children }) => {
//   const [current, send] = useMachine(globalMachine);
//   return (
//     <GlobalStateContext.Provider value={current}>
//       <GlobalDispatchContext.Provider value={send}>{children}</GlobalDispatchContext.Provider>
//     </GlobalStateContext.Provider>
//   );
// };
