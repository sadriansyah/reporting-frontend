import Dashboard from '../../../component/Master/dashboard';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import {getData,editData} from '../../../services/helpers';
import axios from 'axios';
export default function ProjectDetail(props) {
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [prefix, setPrefix] = useState('');
  const [pic, setPic] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isSend, setIsSend] = useState(false);
  const {id} = props;
  const router = useRouter();
  useEffect(()=> {
    fetchdata()
  },[])

  const fetchdata = async() => {
    const link = "project/detail/"+id;
    const res = await getData(link);
    if(res.status == 200){
      setProjectName(res.result.project_name);
      setClient(res.result.project_company);
      setPrefix(res.result.project_prefix);
      setPic(res.result.project_pic);
      setEmail(res.result.project_email);
      setContact(res.result.project_contact);
    }
  }

  const handlerSubmit = async(e) => {
    e.preventDefault()
    setIsSend(true)
    const payload = {
      project_name:projectName,
      project_company:client,
      project_prefix:prefix,
      project_pic:pic,
      project_email:email,
      project_contact:contact
    }
    const link = "project/update/"+router.query.id;
    const post = await editData(payload,link);
    if(post.status == 200){
      alertify.success('Data telah diupdate');
    }else{
      alertify.error(`Error : ${post.result}`);
    }
    setIsSend(false)
  }

  return (
    <Dashboard pageTitle="Project Detail | Thinkmatch Report App">p
      <div className="content">
          <div className="container-fluid">
              <div className="page-title-box">
                  <div className="row align-items-center">
                      <div className="col-sm-6">
                          <h4 className="page-title">Project Detail</h4>
                      </div>
                      <div className="col-sm-6">
                          <ol className="breadcrumb float-right">
                              <li className="breadcrumb-item"><Link href="/">Dashboard</Link></li>
                              <li className="breadcrumb-item"><Link href="/project">Project</Link></li>
                              <li className="breadcrumb-item active">Project Detail</li>
                          </ol>
                      </div>
                  </div>
              </div>

              <div className="row">
                  <div className="col-xl-12">
                    <div className="card m-b-30">
                        <div className="card-body">
                        <form  onSubmit={handlerSubmit}>

                          <h4 className="mt-0 header-title">{projectName}</h4>
                          <p className="sub-title">Project {client}</p>
                          <div className="form-group row">
                            <label className="col-xl-2">Project Name</label>
                            <div className="col-xl-10">
                               <input type="text" required className="form-control" onChange={e => setProjectName(e.target.value)} defaultValue={projectName} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-2">Project Company</label>
                            <div className="col-xl-10">
                               <input type="text" required className="form-control" onChange={e => setClient(e.target.value)}  defaultValue={client} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-2">Project Prefix</label>
                            <div className="col-xl-10">
                               <input type="text" required className="form-control" onChange={e => setPrefix(e.target.value)}  defaultValue={prefix} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-2">Project PIC</label>
                            <div className="col-xl-10">
                               <input type="text" required className="form-control" onChange={e => setPic(e.target.value)}  defaultValue={pic} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-2">Project Email</label>
                            <div className="col-xl-10">
                               <input type="email" required className="form-control" onChange={e => setEmail(e.target.value)}  defaultValue={email} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-2">Project Contact</label>
                            <div className="col-xl-10">
                               <input type="text" className="form-control"  onChange={e => setContact(e.target.value)} defaultValue={contact} />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-12 text-right">
                              <Link href="/project" className="btn btn-primary m-2"> Back</Link>
                              {
                                isSend?
                                (
                                <button className="btn btn-warning m-2" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="sr-only">Menyimpan...</span>
                                </button>
                                )
                                :
                                (
                                <button type="submit" className="btn btn-warning m-2">Simpan</button>
                                )
                              }
                            </div>
                          </div>
                        </form>


                        </div>
                    </div>
                  </div>
              </div>
          </div>

      </div>

  </Dashboard >
  )
}

export async function getServerSideProps(context){
  const id = context.params.id;
  return {
    props:{
      id:id
    }
  }
}
