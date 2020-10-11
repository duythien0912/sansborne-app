// import { Machine } from 'xstate';

// const RegisterMachine = Machine({
//   id: 'register',
//   initial: 'editing',
//   context: {
//     name: '',
//     email: '',
//     phone: '',
//     error: null,
//   },
//   states: {
//     editing: {
//       on: {
//         CHANGE_NAME: {
//           actions: 'changeName',
//         },
//         CHANGE_EMAIL: {
//           actions: 'changeEmail',
//         },
//         CHANGE_PHONE: {
//           actions: 'changePhone',
//         },
//       },
//       SUBMIT: 'submitting',
//     },
//   },
//   submitting: {
//     invoke: {
//       src: 'submit',
//       onDone: {
//         target: 'success',
//         actions: 'setUserData',
//       },
//       onError: {
//         target: 'failure',
//         actions: 'setError',
//       },
//     },
//   },
//   success: {
//     type: 'final',
//   },
//   failure: {
//     on: {
//       CHANGE_NAME: {
//         target: 'editing',
//         actions: ['changeName', 'clearError'],
//       },
//       CHANGE_EMAIL: {
//         target: 'editing',
//         actions: ['changeEmail', 'clearError'],
//       },
//       CHANGE_PHONE: {
//         target: 'editing',
//         actions: ['changePhone', 'clearError'],
//       },
//     },
//   },
// });

// export { RegisterMachine };
