import React from 'react';
import { Flex, Heading, Input, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearch }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box width="100vw" bg="blue.500">
      <Flex
        p={4}
        align="center"
        justify="space-between"
        color="white"
        maxWidth="1200px"
        mx="auto"
        width="100%"
      >
        <Heading size="md">
          <Link to="/">Trello</Link>
        </Heading>
        <Flex align="center" width={{ base: '100%', md: 'auto' }}>
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            maxW={{ base: '100%', md: '400px' }}
            bg="white"
            color="black"
            mr={4}
            width="100%"
          />
          {isAuthenticated && (
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
