
import {useEffect, useState} from 'react';
import {showingdate, showday, getData} from '../../../services/helpers';
import Loader from '../../../component/loader/loader';

function MomCreate(props) {
  const [mom, setMom] = useState([]);
  const [project, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {data} = props;
  useEffect(()=>{
    setMom(data.data.mom);
    setProject(data.data.project);
    setIsLoading(false);
  },[]);


  return (
    <>
        {
          isLoading?
          (
          <Loader />
          )
          :
          (

          <div className="row">
            <div className="col-12">
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
                            <td><img src="/assets/images/users/Cimby.png" alt="signature" style={{width:'40%'}} /> </td>
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

          </div>
          )
        }
    </>
  )
}

export default MomCreate
export async function getServerSideProps(context){
  const link = process.env.API_LINK+"mom/detail/"+context.params.id;
  const res = await fetch(link);
  const data = await res  .json();
  return {
    props:{
      data:data
    }
  }
}
