import { FC, useState } from 'react'
import { MdTimer, MdRemoveRedEye } from 'react-icons/md'
import { colors } from '../colors'
import { tasksType } from '../redux/slices/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { hide } from '../redux/slices/sidebarSlice'
import { addTask } from '../redux/slices/tasksSlice'
import { RootState } from '../redux/store'

interface IProps {
    setSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTask: FC<IProps> = ({ setSidebarMobile }: IProps) => {

    const[name, setName] = useState<string>('What\'s New?');
    const[desc, setDesc] = useState<string>('Type some details about your task');
    const[currentColor, setCurrentColor] = useState<string>(colors[4]);
    const[duration, setDuration] = useState<{ hours: number, minutes: number }>({
        hours: 1,
        minutes: 5
    })
    const[priority, setPriority] = useState<boolean>(false);

    const[error, setError] = useState<string>('');

    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.tasks);


    const validateName = () => {
        if (name.length !== 0) {
            if (name.length > 20) {
                setError('Task title must be 20 characters or less.');
                return false;
            }
            if (tasks.value.some((task: tasksType) => task.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
                setError('Task already exists.');
                return false;
            }

            setError('');
            return true;
        }
        else {
            setError('You must enter a task title.');
            return false;
        }
    }

    const validateDesc = () => {
        if (desc.length !== 0) {
            if (desc.length > 100) {
                setError('Description must be 100 characters or less.');
                return false;
            }

            setError('');
            return true;
        }
        else {
            setError('You must enter a task description.');
            return false;
        }
    }

    const submitTask = (): void => {
        if (validateName() && validateDesc()) {
            dispatch(addTask({
                name: name,
                desc: desc,
                currentColor: currentColor,
                duration: duration,
                priority: priority
            }))

            setName('What\'s New?');
            setDesc('Type some details about your task');
            setCurrentColor(colors[4]);
            setDuration({
                hours: 1,
                minutes: 5
            })
            setPriority(false);

        setSidebarMobile(false);
        }
    }

  return (
    <div className='add-task'>
        <MdRemoveRedEye id="eye" onClick={() => dispatch(hide())} />
        <MdRemoveRedEye id="eye-mobile" onClick={() => setSidebarMobile(false)} />
        
        <div className="task-details">
            <h3>Task</h3>

            <div className="input">
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <textarea cols={30} rows={5} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
        </div>

        <div className="category">
            <h3>Category</h3>

            <div className='color-options-container'>
                { colors.map((color: string) => (
                    <div className={color === currentColor ? 'active-color color-options' : 'color-options'} style={{ backgroundColor: `#${color}` }} onClick={() => setCurrentColor(color)} />
                )) }
            </div>
        </div>

        <div className="duration">
            <h3>Time Estimate</h3>

            <div className="duration-input-container">
                <div className='duration-input'>
                    <div className="time-input">
                        <input type="number" value={duration.hours} onChange={(e) => setDuration({
                            ...duration,
                            hours: Number(e.target.value)
                        })} />
                        <h2 id="hours">hours</h2>
                    </div>

                    <div className="time-input">
                        <input type="number" value={duration.minutes} onChange={(e) => setDuration({
                            ...duration,
                            minutes: Number(e.target.value)
                        })} />
                        <h2>minutes</h2>
                    </div>
                </div>

                <MdTimer id="timer" />
            </div>
        </div>

        <div className="priority">
            <input type="checkbox" name="priority" onChange={(e) => setPriority(e.target.checked)} checked={priority} />
            <label htmlFor="priority">Make priority</label>
        </div>

        <button onClick={submitTask}>Create Task</button>

        <p className='error'>{ error }</p>
    </div>
  )
}

export default AddTask