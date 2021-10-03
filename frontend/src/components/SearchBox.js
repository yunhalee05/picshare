import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SearchBox() {
    const [name, setName] = useState('')

    return (
            <div className="search">
                <input type="text" name="name" id = "name" onChange={e=>setName(e.target.value)}  value={name}/>
                <Link to={`/search/name/${name}`}><i className="fa fa-search" ></i></Link>
                {
                    name &&
                    <div className="search_reset_button" onClick={()=>setName('')} >
                        <span >&times;</span>
                    </div>
                }
            </div>
    )
}

export default SearchBox
