import React, { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';

interface TaskFormProps {
  onCreateTask: (listId: string, name: string, desc: string) => void;
  listId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask, listId }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = () => {
    if (name && desc) {
      onCreateTask(listId, name, desc);
      setName('');
      setDesc('');
    }
  };

  return (
    <VStack spacing={2} width="100%">
      <Input placeholder="Task name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Task description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <Button onClick={handleSubmit} width="100%">Add Task</Button>
    </VStack>
  );
};

export default TaskForm;
