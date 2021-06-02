import CreatableSelect from 'react-select/creatable'
import { CSSProperties, useState } from "react"

const transcriptionStyle:CSSProperties = {
    fontSize:21,
    maxWidth:900,
    color:'white',
    margin:'auto',
    paddingBottom:'1em',
    minHeight:'calc(100vh - 80px - 100px - 4em)'
}

const tableStyle:CSSProperties = {
    width:'100%',
    padding: '1.5rem 0',    
    minHeight:'calc(100vh - 80px - 100px - 4em - 1em - 100px)',
    border:'2px solid gray'
}

const leftTableStyle:CSSProperties = {
    width:200,
    color: 'white',
    background: '#222',
    verticalAlign:'middle'
}

interface iOption { label:string }
export interface iSummary { titles:iOption[], topics:string[], notes:string[], conclusion:string }
export const Summary = ({ titles, topics, notes, conclusion }: iSummary) => {
    const [ editTitle, setTitleEdit ] = useState(false)

    return <div className='container' style={transcriptionStyle}>
        <p 
            className='title is-1 has-text-centered' 
            style={{marginBottom:'1em', color: 'goldenrod'}}
        >  Meeting Summary </p>

        <table className="table" style={tableStyle}>
            <thead>
                <tr onMouseEnter={() => setTitleEdit(true)} onMouseLeave={() => setTitleEdit(false)}>
                    <th style={{...leftTableStyle, height:68}}> Title </th>
                    <th colSpan={2} style={{verticalAlign:'middle'}}> 
                        { !editTitle && <p className='title is-3 has-text-centered'> { titles[0]?.label } </p> }
                        { editTitle && <CreatableSelect isClearable options={titles} value={titles[0]} /> }
                    </th>
                </tr>

                { topics.map((topic, i) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={topics.length}> Topics </th> }
                        <td colSpan={2} style={{borderWidth:0}}> • { topic } </td>
                    </tr>
                )}

                { notes.map((note, i) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={notes.length}> Notes </th> }
                        <td colSpan={2} style={{borderWidth:0}}> • { note } </td>
                    </tr>
                )}

                <tr>
                    <th style={leftTableStyle}> Conclusion </th>
                    <th colSpan={2}> 
                        <p className='subtitle is-4'> { conclusion } </p>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
}
