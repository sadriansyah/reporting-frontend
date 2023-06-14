import Image from 'next/image'
import Link from 'next/link';
import Dashboard from '../component/Master/dashboard';
import CardImage from '../component/page/card-image';
export default function Page() {
  return (
    <Dashboard pageTitle="Home | Thinkmatch Report App">
    <div className="content">
      <div className="container-fluid">
        <div className="page-title-box">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h4 className="page-title">Dashboard</h4>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-right">
                <li className="breadcrumb-item"><Link href="#">Thinkmatch</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <CardImage link="users/dashboard" color="primary" header="Total User" footer="Users Total" icon="fa fa-user" />
          </div>
          <div className="col-sm-6 col-xl-3">
            <CardImage link="task/dashboard" color="success" header="Task" footer="Task Done" icon="mdi mdi-briefcase-check" />
          </div>
          <div className="col-sm-6 col-xl-3">
            <CardImage link="mom/dashboard" color="warning"  header="Mom" footer="Mom Created" icon="mdi mdi-tag-text-outline" />
          </div>
          <div className="col-sm-6 col-xl-3">
            <CardImage link="project/dashboard" color="danger" header="Project" footer="Project Total" icon="mdi mdi-buffer" />
          </div>
        </div>

        <div className="row">

          <div className="col-xl-12">
            <div className="card m-b-30">
              <div className="card-body">
                <h4 className="mt-0 header-title mb-4">Recent Activity</h4>
                <ol className="activity-feed mb-0">
                  <li className="feed-item">
                    <div className="feed-item-list">
                      <p className="text-muted mb-1">Now</p>
                      <p className="font-15 mt-0 mb-0">Activity is not available now <b className="text-primary">Coming Soon</b></p>
                    </div>
                  </li>
                  
                </ol>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Dashboard>
  )
}
