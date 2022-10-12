import { AiOutlineDropbox } from 'react-icons/ai'

function EmptyPage() {
  return (
    <div className='empty'>
        <AiOutlineDropbox className='empty-box' />
        <p>Uh oh... looks like you're all done!</p>
    </div>
  )
}

export default EmptyPage