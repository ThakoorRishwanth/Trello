import React from 'react';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { Task } from '../types';

interface TaskProps {
  task: Task;
  onUpdateTask: (taskId: string, name: string, desc: string) => void;
  onDeleteTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, onDeleteTask, onSelectTask }) => (
  <Box p={3} bg="gray.50" borderRadius="md" boxShadow="sm">
    <Heading size="sm" color="gray.800">{task.name}</Heading>
    <Text color="gray.600">{task.desc}</Text>
    <HStack mt={2}>
      <Button size="sm" onClick={() => onSelectTask(task)}>Update Task</Button>
      <Button size="sm" colorScheme="red" onClick={() => onDeleteTask(task.id)}>Delete Task</Button>
    </HStack>
  </Box>
);

export default TaskComponent;
