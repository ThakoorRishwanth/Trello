import React from 'react';
import { Box, Heading, List, VStack } from '@chakra-ui/react';
import { Column, Task } from '../types';
import TaskComponent from './Task';
import TaskForm from './TaskForm';

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onCreateTask: (listId: string, name: string, desc: string) => void;
  onUpdateTask: (taskId: string, name: string, desc: string) => void;
  onDeleteTask: (taskId: string) => void;
  searchTerm: string;
  onSelectTask: (task: Task) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column, tasks, onCreateTask, onUpdateTask, onDeleteTask,  onSelectTask }) => {
  return (
    <Box bg="white" p={5} borderRadius="md" boxShadow="md" height="100%">
      <Heading size="md" mb={4} color="gray.700">{column.name}</Heading>
      <List spacing={3} overflowY="auto" maxHeight={{ base: '200px', md: '300px' }}>
        {tasks.map((task: Task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onSelectTask={onSelectTask}
          />
        ))}
      </List>
      <VStack mt={4} spacing={2}>
        <TaskForm onCreateTask={onCreateTask} listId={column.id} />
      </VStack>
    </Box>
  );
};

export default ColumnComponent;
