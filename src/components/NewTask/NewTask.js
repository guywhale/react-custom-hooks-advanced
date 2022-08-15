import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHTTPFetch from '../../hooks/use-http-fetch';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHTTPFetch();

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: 'https://react-http-requests-b9d38-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
				method: 'POST',
				body: { text: taskText },
				headers: {
					'Content-Type': 'application/json',
				},
			},
			createTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
