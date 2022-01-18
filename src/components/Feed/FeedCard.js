import React from 'react';
import Logo from "../../assets/images/logo.png";

export default function FeedCard() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row g-0 fs-5">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title fs-2">Blog Title</h5>
              <p className="card-text"><small className="text-muted"><span className="fw-bold">Username</span>; Today</small></p>
              <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia perferendis magnam fuga, veniam consectetur qui est reiciendis corrupti ex deserunt harum eveniet error non repudiandae quaerat placeat officiis illo, sint, exercitationem quod ratione fugiat. Doloribus quisquam rerum earum molestias sed, aperiam nemo, ullam aut, omnis hic temporibus aliquam debitis perspiciatis.</p>

              <button className="btn btn-outline-light"><i className="fa fa-thumbs-up text-dark"></i></button>
            </div>
          </div>
          <div className="col-md-4">
            <img src={Logo} className="img-fluid rounded-start" alt="Post Icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
