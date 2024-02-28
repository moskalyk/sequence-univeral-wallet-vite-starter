import { useState } from 'react'
import './App.css'
import { sequence } from '0xsequence'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [address, setAddress] = useState<any>(null)

  sequence.initWallet('AQAAAAAAABT5pgun7vPWSs8wsI4BzaQJmlI', {defaultNetwork: 'polygon'})

  const connect = async () => {
    try {
      let wallet = sequence.getWallet()
      console.log('already connected')
      console.log(wallet.getAddress())
      setIsLoggedIn(true)
      setAddress(wallet.getAddress())
    } catch(err){
      console.log('not connected')
      let wallet = sequence.getWallet()
      try {
        const details = await wallet.connect({app: 'demo-vite-starter'})
        if(details.connected){
          setIsLoggedIn(true)
          setAddress(details.session?.accountAddress)
        }
      }catch(err){
        console.log('user closed wallet')
      }
    }
  }
  const disconnect = () => {
    localStorage.clear()
  }

  return (
    <>
        {!isLoggedIn ? <button onClick={() => connect()}>connect</button> : <>{"connected " + address}</>}
        {!isLoggedIn ? <button onClick={() => disconnect()}>disconnect</button> : <>{"connected " + address}</>}
    </>
  )
}

export default App
