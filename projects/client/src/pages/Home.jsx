import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, Text, FormControl, Input, useToast
} from '@chakra-ui/react';
import axios from 'axios';

const Home = () => {
  const API_URL = "http://localhost:8000"
  const [toggle, setToggle] = React.useState(false); // untuk membuka/menutup modal
  const [task, setTask] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [varStatus1, setVarStatus1] = React.useState('outline');
  const [varStatus2, setVarStatus2] = React.useState('outline');
  const [varStatus3, setVarStatus3] = React.useState('outline');
  const iduser = localStorage.getItem('active');

  const toast = useToast();

  const addTask = () => {
    axios.post(API_URL + "/task/addtask", {
      task,
      status,
      iduser
    }).then((res) => {
      if (res.data.success) {
        toast({
          title: "Add Task Success",
          status: "success",
          duration: 3000,
          isClosable: true
        })
      }
      setToggle(!toggle);
      setTask('');
      setStatus('');
      setVarStatus1('outline');
      setVarStatus2('outline');
      setVarStatus3('outline');

    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div style={{ background: "#F7EBDD" }}>
      <div className='container pb-5 pt-2'>
        <Text style={{ color: '#EAC99D', textAlign: 'center' }} fontSize='xl' className='fw-bold pt-4 pb-2'>PERSONAL TASK MANAGER</Text>
        <div className='d-flex justify-content-between mt-4 align-items-center'>
          <Text style={{ color: '#2F9B9B' }} fontSize='md'>2 Tasks</Text>
          <Button variant='solid' colorScheme='teal' onClick={() => setToggle(!toggle)}>Add New Task</Button>
          <Text style={{ color: '#2F9B9B' }} fontSize='md'>Clear Completed</Text>
        </div>
        <Modal isOpen={toggle} onClose={() => setToggle(!toggle)} size='xl' isCentered>
          <ModalOverlay />
          <ModalContent className="p-3">
            <ModalCloseButton />
            <ModalBody>
              <FormControl >
                <Text fontSize='xl' className='fw-bold mt-4 mb-2'>Create Task</Text>
                <Input type='text' onChange={(e) => setTask(e.target.value)} placeholder='Task description' />
                <Text fontSize='xl' className='fw-bold mt-4 mb-2'>Categories</Text>
                <Button variant={`${varStatus1}`} colorScheme='yellow' className='me-2' onClick={() => { setStatus(1); setVarStatus1('solid') }} >To Do</Button>
                <Button variant={`${varStatus2}`} colorScheme='blue' className='me-2' onClick={() => { setStatus(2); setVarStatus2('solid') }}>On Going</Button>
                <Button variant={`${varStatus3}`} colorScheme='green' className='me-2' onClick={() => { setStatus(3); setVarStatus3('solid') }}>Completed</Button>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" variant="solid" className="fw-bold" onClick={addTask} size='md' >Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default Home