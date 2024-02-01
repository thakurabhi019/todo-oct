import React, { useContext, useEffect, useRef } from 'react';
import TaskForm from './TaskForm';
import { formatDate } from '../helper';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function Popup(props) {
    const {actionType,data} = props;
    const closeBtn = useRef(null);
    const{deleteTask}=useContext(TaskContext);
    const{message,setMessage}=useContext(AuthContext);

    useEffect(()=>{
      setMessage("")
    },[])

    const onDelete=()=>{
      deleteTask(data.id);
    } 

    return (
        
          <div className="modal-content bg-primary text-white">
            <div className="modal-header">
              <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {
                    actionType === "view" ? 
            <div>
              <h4>{data?.title}</h4>
              <p>{data?.description}</p>
              <div className="d-flex text-warning align-items-center">
                <p className='mb-0'>Modified On:{formatDate(data?.modifiedOn)}</p>
                <p className='mb-0 ms-auto'>Due Date:{formatDate(data?.duedate)}</p>
              </div>
            </div>
            : actionType === "edit" ?
            <TaskForm isUpdate={true} data={data} closeBtn={closeBtn} isPopup={true} />
            :
            <div>
              {
                message!==""?
                <p>{message}</p>:
                 <p>Are you sure,You want to delete this task?</p>
              }
        
         <div className="d-flex mt-5">
          <button className='btn btn-danger ms-auto me-2' onClick={onDelete}>Yes</button>
          <button className='btn btn-warning' data-bs-dismiss="modal">No</button>
         </div>
            </div>
                }
            </div>
          </div>
    );
}

export default Popup;