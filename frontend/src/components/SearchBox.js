import React, { useState } from 'react'

function SearchBox(props) {
    const [name, setName] = useState('')
    const submitHandler=(e)=>{
        e.preventDefault();
        props.history.push(`/search/name/${name}`)
    }
    return (
        <form onSubmit={submitHandler} className="search">
            <div className="row">
                <input type="text" name="q" id = "q" onChange={e=>setName(e.target.value)} />
                <button className="primary" type="submit"><i className="fa fa-search"></i></button>
            </div>
        </form>
    )
}

export default SearchBox
