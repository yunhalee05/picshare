import React from 'react'

function Footer() {
    return (
        <div className="footer-row">
            <div className="col-1" style={{"textAlign":"center"}} >
                <span className="footer-text">
                    &nbsp; PICSHARE  &nbsp;
                </span>
            </div>
            <div className="col-2" style={{"textAlign":"center"}}>
                <div>
                    <span className="footer-about">
                        about us
                    </span>
                    <span className="footer-abouttext">
                        Made for sharing memory
                    </span>
                </div>
                <div className="footer-reserve" >
                    @2021 PICSHARE ALL RIGHTS RESERVED
                </div>
            </div>
            <div className="col-1" style={{"textAlign":"center"}}>
                <span className="footer-text">
                &nbsp;WITH YOU &nbsp;
                </span>
            </div>
        </div>
    )
}

export default Footer
