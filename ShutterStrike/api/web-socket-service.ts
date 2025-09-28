import SockJS from 'sockjs-client'
import { Stomp, Client } from '@stomp/stompjs'
import { DEV_URI } from '@/constants/uri'

const SERVER_URI = DEV_URI + '/api/ws'
let stompClient: Client | null = null
let isConnected = false

export const connect = (onMessageReceived: (arg0: any) => void) => {
    // create socket
    const socket = new SockJS(SERVER_URI)

    // wrap the socket in a STOMP client
    stompClient = Stomp.over(socket)

    stompClient.connect({}, (frame: string) => {
        console.log('STOMP connected: ' + frame)
        isConnected = true;

        // setup cleint as data consumer
        stompClient.subscribe('/topic/game-coords', (message: { body: string }) => {
            const data = JSON.parse(message.body);
            onMessageReceived(data); 
        })
    })
}