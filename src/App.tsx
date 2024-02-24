import { useState } from 'react'
import './App.css'
import { sequence } from '0xsequence'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [address, setAddress] = useState<any>(null)

  sequence.initWallet('', {defaultNetwork: 'polygon'})

  const connect = async () => {
    const wallet = sequence.getWallet()
    try {
      const details = await wallet.connect({app: 'demo-vite-starter'})
      if(details.connected){
        setIsLoggedIn(true)
        setAddress(details.session?.accountAddress)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
        {!isLoggedIn ? <button onClick={() => connect()}>connect</button> : <>{"connected " + address}</>}
    </>
  )
}

export default App
