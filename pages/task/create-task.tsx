import Dashboard from '../../component/Master/dashboard';
import Link from 'next/link';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

export default function CreateTask() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [noHandphone, setNoHandphone] = useState('');
  const [date, setDate] = useState('');
  const [done, setDone] = useState('');
  const [doing, setDoing] = useState('');
  const [toDo, setToDo] = useState('');
  const [blocker, setBlocker] = useState('');

  const submitTask = async(e) => {
    e.preventDefault();
    const payload = {
      user_name:"Rovi",
      no_handphone:noHandphone,
      task_date:date,
      done:done,
      doing:doing,
      to_do:toDo,
      blocker:blocker
    }
    const post = await axios({
      method:'POST',
      url:process.env.API_LINK+"task/create",
      data:payload
    });
    const response = await post.data;
    router.push('/task')
    alertify.logPosition('bottom right');
    alertify.success('Data telah ditambahkan');
  }



  return (
    <Dashboard pageTitle="MoM | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Document</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="/">Thinkmatch</Link></li>
                <li className="breadcrumb-item"><Link href="/task">Document</Link></li>
                <li className="breadcrumb-item active">Form Task</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title">Form Task</h4>
                <p className="sub-title">Fill form below</p>
                <form onSubmit={submitTask}>
                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-sm-2 col-form-label">No Handphone</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="text" required onChange={e => setNoHandphone(e.target.value)} placeholder="08xxxxxx" />
                  </div>
                  <label htmlFor="example-text-input" className="col-sm-2 col-form-label">Date and Time</label>
                  <div className="col-sm-4">
                    <input className="form-control" type="date" required onChange={e => setDate(e.target.value)} />
                  </div>
                </div>
                

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Done</label>
                  <div className="col-sm-10">
                    <textarea  className="form-control" rows={8} required onChange={e => setDone(e.target.value)} placeholder="Write Done Task" cols={80}></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Doing</label>
                  <div className="col-sm-10">
                    <textarea  className="form-control" rows={8} required onChange={e => setDoing(e.target.value)} placeholder="Write Doing Task" cols={80}></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">To Do</label>
                  <div className="col-sm-10">
                    <textarea  className="form-control" rows={8} required onChange={e => setToDo(e.target.value)} placeholder="Write To Do Task" cols={80}></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Blocker</label>
                  <div className="col-sm-10">
                    <textarea  className="form-control" rows={8} required onChange={e => setBlocker(e.target.value)} placeholder="Write Blocker Task" cols={80}></textarea>
                  </div>
                </div>


                <div className="form-group row">
                  <div className="col-sm-12 text-right">
                    <button type="submit" className="btn btn-primary p-2" name="button">Submit</button>
                  </div>
                </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Dashboard>
  )
}
