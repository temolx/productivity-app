import { FC, useState } from 'react'
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { tasksType } from '../redux/slices/tasksSlice'
import { show } from '../redux/slices/sidebarSlice'
import { changePriorityStatus, removeTask } from '../redux/slices/tasksSlice'

const List: FC = () => {

  const tasks = useSelector((state: any) => state.tasks);
  const currentCategory = useSelector((state: any) => state.currentCategory);
  const currentColor = useSelector((state: any) => state.currentColor);

  const dispatch = useDispatch();

  const[visibleDesc, setVisibleDesc] = useState<string>('');

  return (
        <div className='task-list'>
          <div className="time">
            <div className="time-info">
              <h3>Today</h3>
              <h2>{ tasks.value.reduce((prev: number, curr: tasksType) => prev + curr.duration.hours, 0) }h { tasks.value.reduce((prev: number, curr: tasksType) => prev + curr.duration.minutes, 0) }m</h2>
              { currentColor.value !== '' ? <div className="current-color" style={{ backgroundColor: `#${currentColor.value}` }}></div> : null }
            </div>

              <AiOutlinePlus id="add-icon" onClick={() => dispatch(show())} />
          </div>

          <div className="list">
            {tasks && tasks.value.filter((el: tasksType) => {
              if (currentCategory.value === 0) {
                return el;
              }
              else if (currentCategory.value === 1) {
                return el.priority;
              }
              else {
                return !el.priority;
              }
            }).filter((el: tasksType) => {
              if (currentColor.value === '') {
                return el;
              }
              else return el.currentColor === currentColor.value;
            }).map((task: tasksType) => (            
              <div className="list-item">
                  <div className='category-line' style={{ backgroundColor: `#${task.currentColor}` }}></div>

                  <div className="task-info" onMouseEnter={() => setVisibleDesc(task.name)} onMouseLeave={() => setVisibleDesc('')}>
                      <h5 onClick={() => dispatch(removeTask(task.name))}>{ task.name }</h5>
                      
                      { visibleDesc === task.name ? <div className='description'>
                        <p>{ task.desc }</p>
                      </div> : null }
                  </div>

                  <div className="right">
                    <h5>{ task.duration.hours }h { task.duration.minutes }m</h5>
                    <AiFillStar className={ task.priority ? 'star active-star' : 'star' } onClick={() => dispatch(changePriorityStatus(task.name))} />
                  </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default List