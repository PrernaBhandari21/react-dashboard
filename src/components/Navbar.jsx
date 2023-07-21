import React, { useEffect } from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
// import {FiShoppingCart } from 'react-icons/fi';
// import {  BsChatLeft } from 'react-icons/bs';
import {RiNotification3Line} from 'react-icons/ri';
// import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import {Cart,Chat, Notification, UserProfile} from '.';
import { useStateContext } from '../contexts/ContextProvider';

// =>()   ----- Instant return 


const NavButton = ({title,customFunc,icon,color,dotColor})=>(
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{color}} className='relative text-xl rounded-full p-3 hover:bg:light-gray'>
      <span style={{background : dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/>
      {icon}
      </button>
  </TooltipComponent>
)

const Navbar = () => {

  const {  setActiveMenu, isClicked, handleClick, screenSize, setScreenSize, currentColor , setIsNotification , setIsUserProfile} = useStateContext();

  useEffect(()=>{
    const handleResize=()=> setScreenSize(window.innerWidth)

    window.addEventListener('resize',handleResize)

    handleResize();

    return ()=> window.removeEventListener('resize',handleResize)
  }, [setScreenSize])

  useEffect(()=>{
    if(screenSize <= 900){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  },[screenSize, setActiveMenu])

  // useEffect accepts and arrow func and , secondly a dependency, which means when to be called, if nothing that is [] then it will be called only at the start, and when [screenSize] then it will be called every time it changes, which will be heavy for our application!


  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
            <NavButton title="Menu" customFunc={()=>{setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}} color="blue" icon={<AiOutlineMenu/>} />

            <div className='flex'>
            {/* <NavButton
             title="Cart" 
             customFunc={()=> handleClick('cart')} 
             color={currentColor} 
             icon={<FiShoppingCart/>} 
             /> */}

            {/* <NavButton
             title="Chat" 
             dotColor="#03C9D7"
             customFunc={()=> handleClick('chat')} 
             color={currentColor}
             icon={<BsChatLeft/>} 
             /> */}
            <div onClick={()=> setIsNotification(true)}>
            <NavButton
             title="Notifications" 
             dotColor="#03C9D7"
             customFunc={()=> handleClick('notification')} 
             color={currentColor}
             icon={<RiNotification3Line/>} 
             />
            </div>
            

             {/* <TooltipComponent content="Profile" position='BottomCenter'> */}
              <div className='flex items-center gap-2 p-1 hover:bg-light-gray rounded-lg' onClick={()=> setIsUserProfile(true)}>
                <img src={avatar} alt='avatar' className='rounded-full w-8 h-8'/>
                <p>
                  <span className='text-gray-400 text-14'>Hi, </span>{' '}
                  <span className='text-gray-400 font-bold ml1 text-14'>Joseph</span>
                </p>
                {/* <MdKeyboardArrowDown className='text-gray-400 font-bold ml1 text-14' onClick={()=> setIsUserProfile(true)} /> */}
              </div>
             {/* </TooltipComponent> */}

            {isClicked.cart && <Cart />}
            {isClicked.chat && <Chat />}
            {isClicked.notification && <Notification />}
            {isClicked.userProfile && <UserProfile/>}

            </div>
    </div>
    
  )
}

export default Navbar