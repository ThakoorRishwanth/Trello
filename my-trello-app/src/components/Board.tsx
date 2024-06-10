import React from 'react';
import { Box, SimpleGrid, useBreakpointValue, Text } from '@chakra-ui/react';
import { Column, Task } from '../types';
import ColumnComponent from './Column';

interface BoardProps {
  columns: Column[];
  tasks: Task[];
  onCreateTask: (listId: string, name: string, desc: string) => void;
  onUpdateTask: (taskId: string, name: string, desc: string) => void;
  onDeleteTask: (taskId: string) => void;
  searchTerm: string;
  onSelectTask: (task: Task) => void;
}

const Board: React.FC<BoardProps> = ({ columns, tasks, onCreateTask, onUpdateTask, onDeleteTask, searchTerm, onSelectTask }) => {
  const columnsCount = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3 });

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box width="100%">
      <SimpleGrid columns={columnsCount} spacing={5}>
        {columns.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            tasks={filteredTasks.filter(task => task.idList === column.id)}
            onCreateTask={onCreateTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            searchTerm={searchTerm}
            onSelectTask={onSelectTask}
          />
        ))}
      </SimpleGrid>
      {filteredTasks.length === 0 && (
        <Text mt={5} textAlign="center" color="gray.600">
          No tasks found.
        </Text>
      )}
    </Box>
  );
};

export default Board;
