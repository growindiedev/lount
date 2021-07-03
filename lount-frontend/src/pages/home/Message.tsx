import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { useAuthState } from '../../context/auth'
import { Flex, Text, Box, Tooltip } from '@chakra-ui/react'

type Message_ = {
    uuid: string,
    from: string,
    to: string,
    content: string,
    createdAt: string
}

type props = {
    message: Message_
}

export default function Message({ message }: props) {
  const state: any = useAuthState()
  const user = state?.user
  const sent = message.from === user.username
  const received = !sent

  return (
    <Flex  width="100%">
        <Tooltip placement="auto" label={moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')} fontSize="sm" hasArrow bg="gray.300">
        <Box py="1.5" px="3" borderRadius="xl" bgColor={classNames({'blue.400': sent, 'green.400': received})} mx="5" my="1.5" mb="0" ml={classNames({'auto': sent})} mr={classNames({'auto': received})}>
        <Text  color="whiteAlpha.900" key="message.uuid" >{message.content}</Text>
        </Box>
        </Tooltip>
    </Flex>

  )
}

