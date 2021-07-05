import React, {useState} from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { useAuthState } from '../../context/auth'
import { Flex, Text, Box, Tooltip, IconButton, Icon, Input, HStack } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { REACT_TO_MESSAGE } from '../../queries'
import {reactToMessage} from '../../generated/reactToMessage'
import {HiOutlineEmojiHappy} from 'react-icons/hi'
const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎']


type Message_ = {
    uuid: string,
    from: string,
    to: string,
    content: string,
    createdAt: string
    reactions: reactToMessage
}

type props = {
    message: Message_
}

export default function Message({ message }: props) {
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

  const react = (reaction: string) => {
    reactToMessage({ variables: { uuid: message.uuid, content: reaction } })
  }

  const reactionButton = <IconButton aria-label="reactionButton" color="gray.400" display="contents" icon={<HiOutlineEmojiHappy/>}/>

  return (
    <Flex  width="100%">
        <HStack mx="5" my="5" mb="0" ml={classNames({'auto': sent})} mr={classNames({'auto': received})} justifyContent="flex-start" >
        {sent && reactionButton}
        <Tooltip placement="auto" label={moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')} fontSize="sm" hasArrow bg="gray.300" >
        <Box py="1.5" px="3" mr="1.5" borderRadius="xl" bgColor={classNames({'blue.400': sent, 'green.400': received})}  >
        <Text  color="whiteAlpha.900" key="message.uuid" >{message.content}</Text>
        </Box>
        </Tooltip>
        {received && reactionButton}
        </HStack>
    </Flex>
  )
}

