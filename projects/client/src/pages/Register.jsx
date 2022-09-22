import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Divider,
    Button
} from '@chakra-ui/react'

const Register = () => {
    const API_URL = "http://localhost:8000"
    const navigate = useNavigate();
    const [toggle, setToggle] = React.useState(true)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = React.useState('password');
    const toast = useToast();

    const onRegis = () => {
        axios.post(API_URL + "/auth/register", {
            email: email.toLocaleLowerCase(),
            password
        }).then((res) => {
            navigate('/', { replace: true });
            toast({
                title: "Account created",
                position: 'top',
                description: 'Please Login Again',
                status: "success",
                duration: 3000,
                isClosable: true
            })
            setEmail('')
            setPassword('')

        }).catch((err) => {
            console.log(err);
        });
    }

    const onVisibility = () => {
        if (visible == "password") {
            setVisible("text")
        } else if (visible == "text") {
            setVisible("password")
        }
    }

    return <div style={{ backgroundColor: 'blue' }} >
        <Modal isOpen={toggle} size='2xl'>
            <ModalOverlay
                bgColor={'purple.500'}
            />
            <ModalContent
                bg={'gray.100'}>
                <ModalCloseButton />
                <ModalBody>
                    <h1 className='fw-bold text-xl fs-2 mt-2'>Sign up to TodoApp</h1>
                    <div className='d-flex fs-6 lead text-muted mt-3'>
                        <h6>Have an account ? </h6>
                        <h6 type='button' className='fw-bold text-primary ms-2' onClick={() => navigate('/')}>Login</h6>
                    </div>
                    <Divider className='mt-5' />
                    <div style={{ marginTop: 20 }}>
                        <div>
                            <label className='form-label text-muted'>E-Mail</label>
                            <input
                                type="text"
                                placeholder='name@example.com'
                                className='w-100 form-control '
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <br />
                        <div>
                            <label className='form-label text-muted'>Password</label>
                        </div>
                        <div className='input-group border rounded'>
                            <input type={visible} className="form-control p-3 border-0" placeholder="8+ character" onChange={(e) => setPassword(e.target.value)} />
                            <span onClick={onVisibility} className="input-group-text bg-transparent border-0" id="basic-addon2">
                                {
                                    visible == "password" ?
                                        <AiOutlineEye size={20} type='button' />
                                        : <AiOutlineEyeInvisible size={20} type='button' />
                                }
                            </span>
                        </div>
                        <br />
                        <Button colorScheme='purple' className='w-100 my-5' onClick={onRegis} >Create an Account</Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}

export default Register;