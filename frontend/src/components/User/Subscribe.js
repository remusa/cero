// import React from 'react'
// import { useMutation } from 'react-apollo'
// import StripeCheckout from 'react-stripe-checkout'
// import nprogress from 'nprogress'
// import { SUBSCRIPTION_MUTATION } from '../../gql/UserMutation'
// import { CURRENT_USER_QUERY } from '../../gql/UserQuery'
// import User from './User'

// const Subscribe = props => {
//     const [subscribe, { error, loading }] = useMutation(SUBSCRIPTION_MUTATION, {
//         refetchQueries: [{ query: CURRENT_USER_QUERY }],
//     })

//     const onToken = async (res, subscribe) => {
//         nprogress.start()

//         const subscription = await subscribe({
//             variables: { token: res.id },
//         }).catch(err => {
//             alert(err.message)
//         })

//         subscription.then(nprogress.done())
//     }

//     return (
//         <User>
//             {({ data: me }, loading) => {
//                 if (loading) return null

//                 return (
//                     <Mutation
//                             mutation={CREATE_ORDER_MUTATION}
//                             refetchQueries={[{ query: CURRENT_USER_QUERY }]}
//                         >
//                             {createOrder => (
//                                 <StripeCheckout
//                                     amount={1}
//                                     name='Cero'
//                                     description='Subscription'
//                                     image={null}
//                                     stripeKey='pk_test_fFdB3wMRGV1QMkh3kPrKLcaL'
//                                     currency='USD'
//                                     email={me.email}
//                                     token={res => this.onToken(res, subscribe)}
//                                 >
//                                     {this.props.children}
//                                 </StripeCheckout>
//                             )}
//                         </Mutation>
//                     <StripeCheckout
//                         amount={1}
//                         name='Cero'
//                         description='Subscription'
//                         image={null}
//                         stripeKey='pk_test_fFdB3wMRGV1QMkh3kPrKLcaL'
//                         currency='USD'
//                         email={me.email}
//                         token={res => onToken(res, subscribe)}
//                     >
//                         {props.children}
//                     </StripeCheckout>
//                 )
//             }}
//         </User>
//     )
// }

// export default Subscribe
