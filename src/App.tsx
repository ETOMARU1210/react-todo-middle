import { useState, useEffect } from "react";
import {
  Heading,
  Input,
  Box,
  Center,
  Button,
  Select,
  ButtonGroup,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
type TODOS = {
  id: number;
  title: string;
  status: string;
  detail: string;
};

type OPENTODOS = {
  id: number;
  title: string;
  detail: string;
};

const App = () => {
  const [todos, setTodos] = useState<TODOS[]>([]);

  type STATUSCHANGE = {
    id: number;
  };

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoId, setTodoId] = useState(1);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<TODOS[]>([]);

  const [filter, setFilter] = useState("notStarted");

  const handleSetTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const resetTodoTitle = () => {
    setTodoTitle("");
  };

  const handleSetTodoDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDetail(e.target.value);
  };

  const resetTodoDetail = () => {
    setTodoDetail("");
  };

  const handleAddTodo = () => {
    if (todoTitle !== "" && todoDetail !== "") {
      setTodos([
        ...todos,
        { id: todoId, title: todoTitle, status: "notStarted", detail: "test" },
      ]);
      setTodoId((todoId) => todoId + 1);
      resetTodoTitle();
      resetTodoDetail();
    }
  };

  const handleDeleteTodo = (targetTodo: TODOS) => {
    const DeleteTodos = todos.filter((todo) => {
      return todo.id !== targetTodo.id;
    });
    setTodos(DeleteTodos);
  };

  const handleSetNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => [
    setNewTitle(e.target.value),
  ];

  const handleSetNewDetail = (e: React.ChangeEvent<HTMLInputElement>) => [
    setNewDetail(e.target.value),
  ];

  const handleOpenEditForm = ({ id, title, detail }: OPENTODOS) => {
    setIsEditable(true);
    setEditId(id);
    setNewTitle(title);
    setNewDetail(detail);
  };

  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId(0);
  };

  const handleEditTodo = () => {
    const newTodos = [...todos];
    if (newTitle !== "" && newDetail !== "") {
      setTodos(
        newTodos.map((todo) =>
          todo.id === editId
            ? { ...todo, title: newTitle, detail: newDetail }
            : todo
        )
      );
      setNewTitle("");
      setNewDetail("");
      handleCloseEditForm();
      setEditId(0);
    }
  };

  const handleStatusChange = (
    { id }: STATUSCHANGE,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodos = [...todos];

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "all":
          setFilteredTodos(todos.map((todo) => ({ ...todo })));
          break;
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;
        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;
        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      <Center>
        <Heading>TODOアプリ</Heading>
      </Center>
      <Center>
        {!isEditable ? (
          <Box width="50%">
            <Select
              variant="flushed"
              placeholder="Flushed"
              value={filter}
              onChange={handleSelectChange}
            >
              <option value="all">すべて</option>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </Select>

            <Box mb="20px">
              <Center>
                <Text fontSize=" 3xl " textAlign="center" mb="10px">
                  タイトル
                </Text>
              </Center>
              <Input
                type="text"
                value={todoTitle}
                onChange={handleSetTodoTitle}
              />
            </Box>

            <Box mb="20px">
              <Center>
                <Text fontSize=" 3xl " textAlign="center" mb="10px">
                  詳細
                </Text>
              </Center>
              <Input
                type="text"
                value={todoDetail}
                onChange={handleSetTodoDetail}
              />
            </Box>
            <Button
              onClick={handleAddTodo}
              colorScheme="pink"
              width="100%"
              mb="20px"
            >
              追加
            </Button>

            {filteredTodos.map((todo) => (
              <VStack key={todo.id} spacing={4}>
                <Center>
                  <Flex>
                    <Box>
                      <Text>{todo.title}</Text>
                      <Text>{todo.detail}</Text>
                    </Box>
                    <ButtonGroup variant="outline" ml="10px">
                      <Button
                        colorScheme="teal"
                        onClick={() => handleOpenEditForm(todo)}
                      >
                        編集
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteTodo(todo)}
                      >
                        削除
                      </Button>
                    </ButtonGroup>
                    <Select
                      variant="filled"
                      placeholder="Filled"
                      value={todo.status}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleStatusChange(todo, e)
                      }
                      width="100px"
                      display="inline-block"
                      ml="10px"
                    >
                      <option value="notStarted">未着手</option>
                      <option value="inProgress">作業中</option>
                      <option value="done">完了</option>
                    </Select>
                  </Flex>
                </Center>
              </VStack>
            ))}
          </Box>
        ) : (
          <Box width="50%">
            <Center>
              <Text fontSize=" 3xl ">タイトル</Text>
            </Center>
            <Input
              type="text"
              value={newTitle}
              onChange={handleSetNewTitle}
              mb="10px"
            />
            <Center>
              <Text fontSize=" 3xl ">詳細</Text>
            </Center>
            <Input
              type="text"
              value={newDetail}
              onChange={handleSetNewDetail}
            />
            <ButtonGroup variant="outline" mt="10px">
              <Button colorScheme="blue" onClick={handleEditTodo}>
                編集を保存
              </Button>
              <Button onClick={handleCloseEditForm}>キャンセル</Button>
            </ButtonGroup>
          </Box>
        )}
      </Center>
    </>
  );
};

export default App;
