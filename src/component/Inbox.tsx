import { FC, useState } from 'react'
import { AiFillStar, AiTwotoneCalendar } from 'react-icons/ai'
import { RiRainbowLine, RiTimeLine } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { showAll, showPriority, showNormal } from '../redux/slices/categoryslice'
import { setColor } from '../redux/slices/colorSlice'
import { colors } from '../colors'
import { MdRemoveRedEye } from 'react-icons/md'

export interface IProps {
    setFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>
  }

const Inbox: FC<IProps> = ({ setFiltersVisible }: IProps) => {

    const[colorsVisible, setColorsVisible] = useState<boolean>(false);
    
    const dispatch  = useDispatch();

    const currentCategory = useSelector((state: any) => state.currentCategory); // 0 - objectives, 1 - tomorrow, 2 - future
    const tasks = useSelector((state: any) => state.tasks);

    let priorityTasks = tasks.value.filter((el: any) => el.priority);
    let normalTasks = tasks.value.filter((el: any) => !el.priority);

  return (
    <div className='inbox'>
        <div className="inbox-header">
            <h3>Inbox</h3>
            <MdRemoveRedEye id="eye-inbox-mobile" onClick={() => setFiltersVisible(false)} />
        </div>

        <ul>
            <li>
                <div className={currentCategory.value === 0 ? 'text text-active' : 'text'} onClick={() => {dispatch(showAll()); setFiltersVisible(false)}}>
                    <AiFillStar id="star" /> Objectives
                </div>

                <h3 className='task-amount'>{ tasks.value.length }</h3>
            </li>

            <li>
                <div className={currentCategory.value === 1 ? 'text text-active' : 'text'} onClick={() => {dispatch(showPriority()); setFiltersVisible(false)}}>
                    <AiTwotoneCalendar id="star" /> Priority Project
                </div>

                <h3 className='task-amount'>{ priorityTasks.length }</h3>
            </li>

            <li>
                <div className={currentCategory.value === 2 ? 'text text-active' : 'text'} onClick={() => {dispatch(showNormal()); setFiltersVisible(false)}}>
                    <RiTimeLine id="star" /> Someday
                </div>

                <h3 className='task-amount'>{ normalTasks.length }</h3>
            </li>

            <li className='color-categories' onMouseLeave={() => setColorsVisible(false)}>
                <div className='text'  onMouseEnter={() => setColorsVisible(true)} >
                    <RiRainbowLine id="star" /> Category
                </div>

                <h3 className='task-amount'>4</h3>

                { colorsVisible ? <div className="color-filter-container">
                    { colors.map((color: string) => (
                        <div className="color-filter" style={{ backgroundColor: `#${color}` }} onClick={() => { dispatch(setColor(color)); setColorsVisible(false); setFiltersVisible(false) }} />
                    )) }

                        <div className="color-filter color-filter-cancel" onClick={() => { dispatch(setColor('')); setColorsVisible(false); setFiltersVisible(false) }} />
                </div> : null }
            </li>
        </ul>
    </div>
  )
}

export default Inbox