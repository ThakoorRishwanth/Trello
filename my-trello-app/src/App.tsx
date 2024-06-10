import React, { useState } from 'react';
import { ChakraProvider, useDisclosure, useToast, Flex, Box } from '@chakra-ui/react';
import { useTrello } from './hooks/useTrello';
import Board from './components/Board';
import TaskModal from './components/TaskModal';
import { Task } from './types';

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import { AuthProvider } from './contexts/AuthContext';
import Navbar from './pages/Navbar';
import ProtectedRoute from './privateRouter/ProtectedRouter';

const AppContent: React.FC = () => {
  const { columns, tasks, createTask, updateTask, deleteTask } = useTrello();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleCreateTask = (listId: string, name: string, desc: string) => {
    createTask(listId, name, desc);
    toast({
      title: 'Task created.',
      description: 'The task has been created successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateTask = (taskId: string, name: string, desc: string) => {
    updateTask(taskId, name, desc);
    toast({
      title: 'Task updated.',
      description: 'The task has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: 'Task deleted.',
      description: 'The task has been deleted successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  };

  return (
    <Flex direction="column" minH="100vh">
      <Navbar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <Flex flex="1" bg="gray.100" p={5} overflowY="auto" direction="column">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Board
                    columns={columns}
                    tasks={tasks}
                    onCreateTask={handleCreateTask}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                    searchTerm={searchTerm}
                    onSelectTask={handleSelectTask}
                  />
                  {selectedTask && (
                    <TaskModal
                      task={selectedTask}
                      isOpen={isOpen}
                      onClose={onClose}
                      onUpdateTask={handleUpdateTask}
                    />
                  )}
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Flex>
    </Flex>
  );
};

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box
          bgImage="url('https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif')"
          bgSize="cover"
          bgPosition="center"
          minH="100vh"
          minW="100vw"
        >
       
            <AppContent />
        
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
