import { Container,Box, Text, Input, Stack, InputGroup, InputRightElement, Button, Divider} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

 const API_URL= "http://localhost:8000"
  const [visible,setVisible]=useState('password')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')


  const onLogin=async()=>{
    axios.post(API_URL +`/auth/login`,{
      email,
      password
    })
    .then((res)=>{
      console.log(res.data)
      navigate('/home', {replace:true})
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const showPass = ()=>{
    if(visible === 'password'){
      setVisible('text')
  }else if(visible === 'text'){
      setVisible('password')
  }
  }

  return (
    <Box style={{height:'100vh'}} bgGradient='linear(to-b, purple.200, pink.500)'>
      <Container maxW='md' py='12' >
        <Box backgroundColor='whiteAlpha.400' shadow='xl' w={400} rounded='2xl' py={2}>
          <Text fontSize='2xl' fontWeight='bold' px={3} py={5} border='1px' borderLeft='none' borderRight='none' borderTop='none'  borderColor={'white'} >Login</Text>
          <Stack  spacing={3} mx='10' my='10'>
            <Input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' _placeholder={{ color: 'black',fontWeight:'bold'}} />
            <InputGroup>
               <Input type={visible} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password' _placeholder={{ color: 'black',fontWeight:'bold'}} />
               <InputRightElement>
                <AiFillEye h='1.75rem' mr={2} onClick={showPass} />
               </InputRightElement>
            </InputGroup>
              <Button textAlign='center' textColor='purple.900' fontWeight='bold' variant='unstyled'>Forgot your password ?</Button>
              <Button colorScheme='purple' textColor='white' rounded='2xl' onClick={onLogin}>Login</Button>
          </Stack>
          <Divider color='white'/>
          <div className='d-flex justify-content-center'>
            <Button my={10} variant='unstyled' textColor='purple.900' fontWeight='bold' onClick={()=>navigate('/register')}  >Alredy have an account sign up?</Button>
          </div>
        </Box>
      </Container>
    </Box>
  )
}

export default Login