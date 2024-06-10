import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Task } from '../types';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (taskId: string, name: string, desc: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onUpdateTask }) => {
  const [name, setName] = React.useState(task?.name || '');
  const [desc, setDesc] = React.useState(task?.desc || '');

  React.useEffect(() => {
    if (task) {
      setName(task.name);
      setDesc(task.desc);
    }
  }, [task]);

  const handleUpdate = () => {
    if (task) {
      onUpdateTask(task.id, name, desc);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3}>
            <Input
              placeholder="Task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Task description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>Update</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
