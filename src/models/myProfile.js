import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import profileDoc from "../../assets/ProfileDoc/mathuprofile2023.pdf";

const MyProfile = (props) => {
  const canDisplayPDF = () => {
    const userAgent = window.navigator.userAgent;
    return /Firefox/.test(userAgent);
  };

  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div
          className="breadcrumb-bar-two pt-3 pb-1 p-0 "
          style={{ minHeight: "100px" }}
        >
          <div className="container">
          </div>
        </div>
        {/* /Breadcrumb */}
      </>

      <div className="content pt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="pdf-container">
                <embed
                  src={profileDoc}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                  className="pdf-viewer"
                />
              </div>
              <div className="text-center mt-3">
                <p>
                  If you are unable to view the Profile, you can download it by
                  clicking the link below:
                </p>

                <button type="submit" className="btn">
                  <a href={profileDoc} download>
                    Download PDF
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default MyProfile;
