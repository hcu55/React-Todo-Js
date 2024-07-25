import React, { useEffect, useState } from 'react'
import { TODO_CATEGORY_ICON } from '@/constants/icon'

const TodoForm = ({ onAdd, onClose, children, todo, onUpdate }) => {

	// children -> New Todo or Update Todo
	const isNewTodoForm = (children) => children.startsWith('New') ? true : false;

	// TODO: state를 하나의 Todo 객체로 관리할 수 있도록 state 줄여보기
  const [title, setTitle] = useState(isNewTodoForm(children) ? '' : todo.title);
  const [summary, setSummary] = useState(isNewTodoForm(children) ? '' : todo.summary);
  const [category, setCategory] = useState(isNewTodoForm(children) ? 'TODO' : todo.category);
	const [isFormValid, setIsFormValid] = useState(false);
	
  useEffect(() => {
    if (title.trim() === '' || summary.trim() === '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [title, summary]);

  const addOrUpdateTodoHandler = () => {
    if (isFormValid && isNewTodoForm(children)) {
			// Add로직
      onAdd({ title, summary, category });
      onClose();
    } else {
			//Update 로직
			const updateTodo = {
				id: todo.id,
				title,		// title: title과 같음
				summary,
				category
			}
			onUpdate(updateTodo);
			onClose();
		}
  };

  return (
    <>
			<h3 className="text-3xl text-red-200">{ children }</h3>
			<form className='my-2'>
				<div>
					<label className='block mb-2 text-xl text-white' htmlFor='title'>Title</label>
					<input className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
									type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div>
					<label className='block mb-2 text-xl text-white' htmlFor='summary'>Summary</label>
					<textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
										id='summary' rows='5' value={summary} onChange={(e) => setSummary(e.target.value)}/>
				</div>
				<div>
					<label className='block mb-2 text-xl text-white' htmlFor='category'>Category</label>
					<select className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
									id='category' value={category} onChange={(e) => setCategory(e.target.value)} >
						
						<option value='TODO'>{TODO_CATEGORY_ICON.TODO} To do</option>
						<option value='PROGRESS'>{TODO_CATEGORY_ICON.PROGRESS} On progress</option>
						<option value='DONE'>{TODO_CATEGORY_ICON.DONE} Done</option>
					</select>
				</div>
				{!isFormValid && <div className='mt-2 text-red-500'>모든 항목을 채워서 작성해주세요</div>}
				<div className='flex justify-end gap-4'>
					<button className='text-xl text-white' type='button' onClick={onClose}>Cancel</button>
					<button className='px-6 py-3 text-xl text-red-200' type='button' onClick={addOrUpdateTodoHandler} disabled={!isFormValid}>Add</button>
				</div>
			</form>
    </>
  )
}

export default TodoForm