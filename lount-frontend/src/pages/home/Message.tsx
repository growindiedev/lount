// import React from 'react'
// import moment from 'moment'
// import { useAuthState } from '../../context/auth'

// type Message_ = {
//     uuid: string,
//     from: string,
//     to: string,
//     content: string,
//     createdAt: string
// }

// type props = {
//     message: Message_
// }

// export default function Message({ message }: props) {
//   const state: any = useAuthState()
//   const user = state?.user
//   const sent = message.from === user.username
//   const received = !sent

//   return (
//     <OverlayTrigger
//       placement={sent ? 'right' : 'left'}
//       overlay={
//         <Tooltip>
//           {moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
//         </Tooltip>
//       }
//       transition={false}
//     >
//       <div
//         className={classNames('d-flex my-3', {
//           'ml-auto': sent,
//           'mr-auto': received,
//         })}
//       >
//         <div
//           className={classNames('py-2 px-3 rounded-pill', {
//             'bg-primary': sent,
//             'bg-secondary': received,
//           })}
//         >
//           <p className={classNames({ 'text-white': sent })} key={message.uuid}>
//             {message.content}
//           </p>
//         </div>
//       </div>
//     </OverlayTrigger>
//   )
// }

export default {}