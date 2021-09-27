import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SearchBox({history}) {
    const [name, setName] = useState('')
    // const submitHandler=(e)=>{
    //     e.preventDefault();
    //     history.push(`/search/name/${name}`)
    // }
    return (
            <div className="search">
                <input type="text" name="name" id = "name" onChange={e=>setName(e.target.value)} />
                <Link to={`/search/name/${name}`}><i className="fa fa-search" ></i></Link>
            </div>
    )
}

export default SearchBox
