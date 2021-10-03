import React from 'react'

function Footer() {
    return (
        <div>
            <div style={{display:"flex", justifyContent:"space-around",alignItems:"center"}}>
                <div style={{"textAlign":"center"}} >
                    <span className="footer-text">
                        &nbsp; PICSHARE  &nbsp;
                    </span>
                </div>
                <div  style={{"textAlign":"center"}}>
                    <span className="footer-text">
                    &nbsp;WITH YOU &nbsp;
                    </span>
                </div>
            </div>
            <div  style={{"textAlign":"center"}}>
                <div className="footer-reserve" >
                    @2021 PICSHARE ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
    )
}

export default Footer
