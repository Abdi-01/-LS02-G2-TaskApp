import axios from 'axios';
import React from 'react'
import { Text, Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ImExit } from "react-icons/im";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const API_URL = "http://localhost:8000"
const Home = () => {
  const [taskData, setTaskData] = React.useState([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = async (value) => {
    try {
      let activeUser = localStorage.getItem('active');
      if (value) {
        let getData = await axios.get(API_URL + `/task/usertasks/${activeUser}/${value}`)
        console.log(getData.data)
        setTaskData(getData.data)
      } else {
        let getData = await axios.get(API_URL + `/task/usertasks/${activeUser}/0`)
        console.log(getData.data)
        setTaskData(getData.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onUpdate = async (value, idtask) => {
    try {
      let getUpdate = await axios.patch(API_URL + '/task/update', { status_id: value, idtask })
      if (getUpdate.data.success) {
        getTaskData();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const printTasks = () => {
    return taskData.map((val, idx) => {
      if (val.status_id === 1) {
        return (
          <div className='row m-0 my-1' key={val.idtask}>
            <div className='col-8 d-flex align-items-center'>
              <Text fontWeight='semibold'>{val.task_content}</Text>
            </div>
            <div className='col-4'>
              <Button className='w-100' colorScheme='orange' onClick={() => onUpdate(2, val.idtask)}>{val.status_name.toUpperCase()}</Button>
            </div>
          </div>
        )
      } else if (val.status_id === 2) {
        return (
          <div className='row m-0 my-1' key={val.idtask}>
            <div className='col-8 d-flex align-items-center'>
              <Text fontWeight='semibold'>{val.task_content}</Text>
            </div>
            <div className='col-4'>
              <Button className='w-100' colorScheme='yellow' onClick={() => onUpdate(3, val.idtask)}>{val.status_name.toUpperCase()}</Button>
            </div>
          </div>
        )
      } else if (val.status_id === 3) {
        return (
          <div className='row m-0 my-1' key={val.idtask}>
            <div className='col-8 d-flex align-items-center'>
              <Text fontWeight='semibold'>{val.task_content}</Text>
            </div>
            <div className='col-4'>
              <Button className='w-100' colorScheme='green' disabled>{val.status_name.toUpperCase()}</Button>
            </div>
          </div>
        )
      }
    })
  }

  const onLogout = async () => {
    try {
      localStorage.removeItem('active');
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteTask = async () => {
    try {
      let activeUser = localStorage.getItem('active');
      let getDelete = await axios.delete(API_URL + `/task/delete/${activeUser}`);

      if (getDelete.data.success) {
        getTaskData()
      };
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container pt-3 vh-100 d-flex justify-content-center'>
      <div className='w-75'>
        <div className='d-flex justify-content-end'>
          <Button colorScheme='red' onClick={onLogout} className='d-flex align-items-center'>
            <span className='me-2'>Log Out</span><ImExit />
          </Button>
        </div>
        <div className='d-flex justify-content-center'>
          <Text fontSize='2xl' fontWeight='extrabold'>PERSONAL TASK MANAGER</Text>
        </div>
        <div className='mt-4'>
          <div className='row m-0'>
            {/*FILTER*/}
            <div className='col-4 h-auto'>
              <div className='shadow border-2 p-1 rounded-3 d-flex flex-column align-items-center' style={{ backgroundColor: "#9ec6c3" }}>
                <div className='d-flex justify-content-center'>
                  <Text fontSize='xl' fontWeight='semibold'>FILTER</Text>
                </div>
                <div className='d-flex flex-column my-3 w-75 align-items-center'>
                  <Button className='w-100' colorScheme='orange' onClick={() => getTaskData(1)}>TO DO</Button>
                  <Button className='my-2 w-100' colorScheme='yellow' onClick={() => getTaskData(2)}>ON GOING</Button>
                  <Button className='w-100' colorScheme='green' onClick={() => getTaskData(3)}>COMPLETED</Button>
                  <Button className='my-2 w-100' colorScheme='gray' onClick={() => getTaskData()}>CLEAR FILTER</Button>
                  <Button className='w-100 p-1' colorScheme='red' variant='link' onClick={onOpen}>CLEAR COMPLETED</Button>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Completed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Are you sure to delete completed task(s)?
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='gray' mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button colorScheme='red' onClick={() => { onClose(); onDeleteTask() }}>Yes</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
            {/*ADD AND PRINT*/}
            <div className='col-8'>
              <div className='shadow p-1 rounded-3 border-2 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#9ec6c3" }}>
                <Text className='mx-2' fontWeight='semibold'>{taskData.length} Tasks</Text>
                <div>
                  <Button colorScheme='green' className='me-2'>
                    <BsFillPlusCircleFill />
                    <span className='ms-1'> New Task</span>
                  </Button>
                </div>
              </div>
              <div className='shadow mt-2 p-1 rounded-3 border-2' style={{ backgroundColor: "#9ec6c3" }}>
                {printTasks()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home