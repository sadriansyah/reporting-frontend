import {showingdate, showingtime,showday, getData, postData, generateFileMom} from '../../../services/helpers';
import Dashboard from '../../../component/Master/dashboard';
import Loader from '../../../component/loader/loader';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
function MomDetail(props) {
  const [mom, setMom] = useState([]);
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendMail, setIsSendMail] = useState(false);
  const router = useRouter;
  useEffect(()=>{
    fetchdata();
  },[])

  const fetchdata = async() => {
    const link = "mom/detail/"+props.id;
    const res = await getData(link);

    if(res.status == 200){
      setMom(res.result.data.mom);
      setProject(res.result.data.project);
      setIsLoading(false);
    }else {
      alertify(`Error : ${res.result}`);
    }
  }


  const print = () => {
    let printContents = document.getElementById('printablemom').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const sendMail = async(id) => {
    var interactive = document.getElementById("interactiveSend");
    setIsSendMail(true);
    var loadingText1 = "<p> <span class='spinner-border spinner-border-sm'></span> <span>  Generating file . . . .</span> </p>";
    var loadingText2 = "<p> <span class='fa fa-check text-success'></span> <span>  Generating file . . . .</span> </p><p> <span class='spinner-border spinner-border-sm '></span> <span>  Send Email . . . .</span></p>";
    var loadingText3 = "<p> <span class='fa fa-check text-success'></span> <span>  Generating file . . . .</span> </p><p> <span class='fa fa-check text-success'></span> <span>  Send Email . . . .</span></p>";
    interactive.innerHTML=loadingText1;
    const payload = {
      id:id
    }
    var urlToGenerate = window.location.origin +"/print/mom/"+id;
    var pathToGenerate = window.location.origin +"/api/generate-pdf?url="+urlToGenerate+"&title="+mom.meeting_title+"&date="+showingtime(mom.date_and_time);
    const generate = await generateFileMom(pathToGenerate);
    if(generate.status = 200){
      interactive.innerHTML = loadingText2;
      const send = await postData(payload,"mom/send-mail");
      if(send.status == 201){
        interactive.innerHTML = loadingText3;
        setIsSendMail(false);
      }else{
        setIsSendMail(false);
        alertify.error(`Error : ${JSON.stringify(send.result)}`)
      }
    }else{
      alertify.erro(`Error : ${JSON.stringify(generate.result)}`);
    }
    // const res = await axios({
    //   method:'POST',
    //   url:process.env.API_LINK+"mom/send-mail",
    //   data:{
    //     id:id
    //   }
    // }).then((res) => {
    //   setIsSendMail(false);
    // }).catch((e) =>{
    //   console.log(e)
    //   setIsSendMail(false);
    // })
  }




  return (
    <Dashboard pageTitle="Mom Detail | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Mom</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><a href="#">Document</a></li>
                <li className="breadcrumb-item"><Link href="/document/mom">Mom</Link></li>
                <li className="breadcrumb-item active">Detail</li>
              </ol>
            </div>
          </div>
        </div>
        {
          isLoading?
          (
          <Loader />
          )
          :
          (

          <div className="row">
            <div className="col-8">
              <div className="card m-b-30" id="printablemom">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="invoice-title">
                        <h4 className="float-right font-16"><strong>{mom.meeting_number}</strong></h4>
                        <h3 className="m-t-0">
                          <img src="/assets/images/logo-thinkmatch.png"  alt="logo" height={24} />
                        </h3>
                      </div>
                      <hr />
                      <div className="row ">
                        <div className="col-md-12 text-center">
                          <h2> MINUTES OF MEETING</h2>
                        </div>
                        <div className="col-md-12 ">
                          <table className="table table-bordered" width="100%">
                            <tbody>
                              <tr>
                                <td width="20%"> <b>Date and Time</b> </td>
                                <td width="30%"> {showingdate(mom.date_and_time)}</td>
                                <td width="20%"><b>Meeting Location</b> </td>
                                <td width="30%"> {mom.meeting_location} </td>
                              </tr>
                              <tr>
                                <td> <b>Meeting Organizer</b></td>
                                <td>{mom.meeting_organizer}</td>
                                <td><b>Meeting Chair</b></td>
                                <td>{mom.meeting_chair}</td>
                              </tr>
                              <tr>
                                <td><b>Minutes Draft Dated</b></td>
                                <td>{showingdate(mom.meeting_draft_dated)}</td>
                                <td><b>Meeting Title</b></td>
                                <td></td>
                              </tr>

                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 mt-4">
                          <table className="table table-bordered" width="100%">
                            <thead>
                              <tr>
                                <th width="50%">Attendes</th>
                                <th width="50%">Apologies</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <ol type="1">
                                    {
                                      mom.to_email.split(',').map((row, i) =>{
                                        return(
                                        <li key={i}>{row}</li>
                                        )
                                      })
                                    }
                                  </ol>
                                </td>
                                <td>
                                  <ol type="1">
                                    {
                                      mom.cc_email.split(',').map((row,i) => {
                                        return (
                                        <li key={i}>{row}</li>
                                        )
                                      })
                                    }
                                  </ol>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Meeting Agenda</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{mom.meeting_title}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Meeting Summary</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ whiteSpace: 'pre-wrap' }}>
                              {mom.meeting_summary}
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 text-center">
                      <table className="table table-borderless" width="100%">
                        <thead>
                          <tr>
                            <th width="50%"></th>
                            <th width="50%"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan="2">{showday(mom.created_at)}, {showingdate(mom.created_at)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2">Mengetahui,</td>
                          </tr>
                          <tr>
                            <td>Perwakilan Thinkmatch</td>
                            <td>Perwakilan {project.project_prefix}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td><img src="/assets/images/users/Cimby.png" alt="signature" style={{width:'40%'}} /></td>
                            <td></td>
                          </tr>

                          <tr>
                            <td>{mom.meeting_dibuat}</td>
                            <td>{mom.meeting_mengetahui}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card m-b-30">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mt-0 header-title">Option</h4>
                      <p className="sub-title">Mom  <code className="highlighter-rouge">will </code>
                        send to participant on attendes and apologies. <code className="highlighter-rouge">Button</code> Send Email
                        will sent to email attendes as (TO) and Apologies email as (CC).</p>
                        <div id="interactiveSend">

                        </div>
                      <div className="button-items">
                        <button className="btn btn-success" onClick={() => sendMail(mom._id)} role="button"> <i className="fa fa-envelope"></i> Send Mom to Email {
                          isSendMail?
                          (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ):
                          (
                            <></>
                          )
                        }</button>
                        <button className="btn btn-info" onClick={print}><i className="fa fa-file"></i> Print MOM</button>
                      </div>

                      <hr />
                      <p>Attachment:</p>
                      <ul type="none">
                      {
                        mom.meeting_attachment == "" ?
                        <></>
                        :
                        <>
                        {
                          mom.meeting_attachment?.split(',').map((row,i) => {
                            if(row !='')
                            return (
                              <li key={i}>
                                <a className="btn btn-light m-2" target="_blank" rel="noopener noreferrer" href={process.env.API_LINK+"mom/file-mom/"+mom.meeting_attachment}> <i className="fa fa-file"></i> {row}</a>
                              </li>
                            )
                          })
                        }
                        </>

                      }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
      </div>
    </div>
    </Dashboard>
  )
}

export default MomDetail

export async function getServerSideProps(context){
  const id = context.params.id;
  return {
    props:{
      id:id
    }
  }
}
