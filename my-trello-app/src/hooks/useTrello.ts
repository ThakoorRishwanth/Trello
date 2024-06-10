import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Column, Task } from '../types';

const API_KEY = "3081b81eeb1602ae788bad9212ef4aaa";
const TOKEN = "ATTAaeaec138175530f39f45b1e43b29cd5d55b46fde47f365deab0aeb7c1c8d76aeC71F7F7F"
const BASE_URL = 'https://api.trello.com/1';

export const useTrello = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [boardId, setBoardId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchBoardId = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/members/me/boards`, {
        params: { key: API_KEY, token: TOKEN },
      });
      setBoardId(response.data[0].id); // Use the first board ID
    } catch (error) {
      setError('Error getting board ID');
      console.error(error);
    }
  }, []);

  const getColumnsAndTasks = useCallback(async () => {
    if (!boardId) return;

    try {
      const columnsResponse = await axios.get(`${BASE_URL}/boards/${boardId}/lists`, {
        params: { key: API_KEY, token: TOKEN },
      });

      setColumns(columnsResponse.data);

      const tasksPromises = columnsResponse.data.map((col: Column) =>
        axios.get(`${BASE_URL}/lists/${col.id}/cards`, {
          params: { key: API_KEY, token: TOKEN },
        })
      );

      const tasksResponses = await Promise.all(tasksPromises);
      const allTasks = tasksResponses.flatMap((response) => response.data);

      setTasks(allTasks);
    } catch (error) {
      setError('Error getting columns and tasks');
      console.error(error);
    }
  }, [boardId]);

  const createTask = async (listId: string, name: string, desc: string) => {
    try {
      await axios.post(`${BASE_URL}/cards`, null, {
        params: { idList: listId, name, desc, key: API_KEY, token: TOKEN },
      });
      getColumnsAndTasks(); // Refresh the tasks list
    } catch (error) {
      setError('Error creating task');
      console.error(error);
    }
  };

  const updateTask = async (taskId: string, name: string, desc: string) => {
    try {
      await axios.put(`${BASE_URL}/cards/${taskId}`, null, {
        params: { name, desc, key: API_KEY, token: TOKEN },
      });
      getColumnsAndTasks(); // Refresh the tasks list
    } catch (error) {
      setError('Error updating task');
      console.error(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${BASE_URL}/cards/${taskId}`, {
        params: { key: API_KEY, token: TOKEN },
      });
      getColumnsAndTasks(); // Refresh the tasks list
    } catch (error) {
      setError('Error deleting task');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBoardId();
  }, [fetchBoardId]);

  useEffect(() => {
    if (boardId) {
      getColumnsAndTasks();
    }
  }, [boardId, getColumnsAndTasks]);

  return {
    columns,
    tasks,
    createTask,
    updateTask,
    deleteTask,
    error,
  };
};
