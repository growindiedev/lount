import React, {useState} from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { useAuthState } from '../../context/auth'
import { 
  Flex, Text, Box, Tooltip, IconButton, HStack,  Popover,
  PopoverTrigger,
  PopoverContent,
  Button, 
  
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { REACT_TO_MESSAGE } from '../../queries'
import {HiOutlineEmojiHappy} from 'react-icons/hi'



type Message_ = {
    uuid: string,
    from: string,
    to: string,
    content: string,
    createdAt: string
    reactions: any
}

type props = {
    message: Message_
}

 function Message({ message }: props) {
  const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']
  const state: any = useAuthState()
  const user = state?.user
  const sent = message.from === user.username
  const received = !sent
  const [showPopover, setShowPopover] = useState(false)
  const reactionIcons = [...new Set(message.reactions && message.reactions.map((r: any) => r.content))]

  const [reactToMessage] = useMutation(REACT_TO_MESSAGE, {
    onError: (err) => console.log(err),
    onCompleted: (data) => setShowPopover(false),
  })

  const react =  (reaction: string) => {
     reactToMessage({ variables: { uuid: message.uuid, content: reaction } })
    console.log(reaction)
    setShowPopover(!showPopover)
  }

 
  const reactionButton = 
  <Popover placement="top" isOpen={showPopover} >
  <PopoverTrigger >
      <IconButton  aria-label="reactionButton" onClick={() => setShowPopover(!showPopover)} color="gray.300" isRound bg="whiteAlpha.500" _focus={{boxShadow: 'none'}} icon={<HiOutlineEmojiHappy/>} />
  </PopoverTrigger>
  <PopoverContent display="flex" px="0" py="1"  alignItems="center"  width="40" borderRadius="3xl" _focus={{boxShadow: 'none'}}>
        {reactions.map((reaction) => (
              <Button
                display="contents"
                key={reaction}
                onClick={() => react(reaction)}
                _hover={{fontSize: '2xl'}}
              >
                {`${reaction}  `}
              </Button>
            ))} 
  </PopoverContent>
</Popover>


  return (
    <Flex width="100%" mb="5" >
        <HStack mx="5" my="5" mb="0"  ml={classNames({'auto': sent})} mr={classNames({'auto': received})}  justifyContent="flex-start">
        {sent && reactionButton}
        <Tooltip placement="auto" m="0" label={moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')} fontSize="sm" hasArrow bg="gray.300" >
        <Box py="1.5" px="3"  borderRadius="2xl" position="relative" bgColor={classNames({'blue.400': sent, 'green.400':received})}  >
          {message.reactions.length > 0 && (
            <Box position="absolute" right="-10px" bottom="-20px" bg="gray.50" p="1" borderRadius="3xl" fontSize="xs" color="gray.500">
              {reactionIcons} {message.reactions.length}
            </Box>
          )}
        <Text  color="whiteAlpha.900" key="message.uuid" >{message.content}</Text>
        </Box>
        </Tooltip>
        {received && reactionButton}
        </HStack>
    </Flex>
  )
}

export default React.memo(Message)