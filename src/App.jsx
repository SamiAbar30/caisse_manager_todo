import './App.css';
import { useState, useEffect } from 'react';
import { RxTrash, RxCheck, RxPlus } from 'react-icons/rx';
import axios from 'axios';
function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3000/todos').then((response) => {
			setTodos(response.data);
		});
	}, []);

	const addTodo = () => {
		axios
			.post('http://localhost:3000/todos', { title: newTodo, valid: false })
			.then((response) => {
				setTodos([...todos, response.data]);
				setNewTodo('');
			});
	};
	const updateTodo = (updatedTodo) => {
		axios
			.put(`http://localhost:3000/todos/${updatedTodo.id}`, {
				...updatedTodo,
				valid: true,
			})
			.then((response) => {
				setTodos(
					todos.map((todo) =>
						todo.id === updatedTodo.id ? response.data : todo,
					),
				);
			});
	};
	const deleteTodo = (todoId) => {
		axios.delete(`http://localhost:3000/todos/${todoId}`).then(() => {
			setTodos(todos.filter((todo) => todo.id !== todoId));
		});
	};
	return (
		<>
			<div className='bg-[#0d0714] min-h-screen flex items-center justify-center p-4'>
				<div className='bg-[#1d1825] p-6 rounded-lg w-full max-w-sm'>
					<div className='flex justify-between items-center mb-4'>
						<input
							type='text'
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							className='border bg-[#1d1825] placeholder-gray-400 text-white rounded-md w-full border-[#9e78cf] p-2'
							placeholder='Add a new task'
						/>
						<button className='bg-[#9e78cf] text-white ml-2 p-2 rounded-md' onClick={addTodo}>
							<RxPlus className='text-white w-6 h-6' />
						</button>
					</div>
					<div className='text-white mb-4 '>
						<h2 className='font-bold'>
							Tasks to do - {todos.filter((todo) => !todo.valid).length}
						</h2>
						<div className='space-y-2 mt-2'>
							{todos.map((todo) => {
								if (!todo.valid) {
									return (
										<div
											key={todo.id}
											className='flex justify-between items-center bg-[#15101c] p-3 rounded-md'>
											<span className=' text-[#9e78cf]'>{todo.title}</span>
											<div className='space-x-2'>
												<button
													className='text-[#9e78cf]'
													onClick={() => updateTodo(todo)}>
													<RxCheck className=' w-6 h-6'/>
												</button>
												<button
													className='text-[#9e78cf]'
													onClick={() => deleteTodo(todo.id)}>
													<RxTrash className=' w-6 h-6'/>
												</button>
											</div>
										</div>
									);
								}
								return null;
							})}
						</div>
					</div>
					<div className='text-white'>
						<h2 className='font-bold'>
							Done - {todos.filter((todo) => todo.valid).length}
						</h2>
						<div className='mt-2 space-y-2'>
							{todos.map((todo) => {
								if (todo?.valid) {
									return (
										<div
											key={todo?.id}
											className='flex justify-between items-center bg-[#15101c] p-3 rounded-md'>
											<span className='line-through text-[#538779]'>
												{todo?.title}
											</span>
										</div>
									);
								}
								return null;
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
