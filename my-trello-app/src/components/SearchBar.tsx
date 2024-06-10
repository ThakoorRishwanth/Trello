import React from 'react';
import { Input, Box } from '@chakra-ui/react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => (
  <Box mb={5}>
    <Input
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      size="lg"
      borderRadius="md"
      boxShadow="sm"
      width="100%"
    />
  </Box>
);

export default SearchBar;
