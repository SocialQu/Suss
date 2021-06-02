import CreatableSelect from 'react-select/creatable'
import { CSSProperties, useState } from "react"
import { OptionTypeBase } from 'react-select'

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
export interface iSummary { titles:iOption[], topics:string[], notes:string[], conclusions:OptionTypeBase[] }
export const Summary = ({ titles, topics, notes, conclusions }: iSummary) => {
    const [ title, setTitle] = useState(titles[0])
    const [ editingTitle, setEditingTitle ] = useState(false)

    const [ conclusion, setConclusion] = useState(conclusions[0])
    const [ editingConclusion, setEditingConclusion ] = useState(false)

    const editTitle = (newTitle:iOption|null) => {
        setTitle(newTitle || {label:''})
        if(newTitle) process.nextTick(() => setEditingTitle(false))
    }

    const editConclusion = (newConclusion:iOption|null) => {
        setConclusion(newConclusion || {label:''})
        if(newConclusion) process.nextTick(() => setEditingConclusion(false))
    }

    return <div className='container' style={transcriptionStyle}>
        <p 
            className='title is-1 has-text-centered' 
            style={{marginBottom:'1em', color: 'goldenrod'}}
        >  Meeting Summary </p>

        <table className="table" style={tableStyle}>
            <thead>
                <tr onMouseEnter={() => setEditingTitle(true)} onMouseLeave={() => setEditingTitle(false)}>
                    <th style={{...leftTableStyle, height:68}}> Title </th>
                    <th colSpan={2} style={{verticalAlign:'middle', borderBottom:'2px solid gray'}} onClick={() => setEditingTitle(true)}> 
                        { !editingTitle && <p className='title is-3 has-text-centered'> { title.label } </p> }
                        { editingTitle && <CreatableSelect isClearable value={title} options={titles} onChange={editTitle}/> }
                    </th>
                </tr>

                { topics.map((topic, i, l) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={topics.length}> Topics </th> }
                        <td colSpan={2} style={{borderBottom:i !== (l.length - 1) ? '0px' : '2px solid gray'}}> • { topic } </td>
                    </tr>
                )}

                { notes.map((note, i, l) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={notes.length}> Notes </th> }
                        <td colSpan={2} style={{borderBottom:i !== (l.length - 1) ? '0px' : '2px solid gray'}}> • { note } </td>
                    </tr>
                )}

                <tr onMouseEnter={() => setEditingConclusion(true)} onMouseLeave={() => setEditingConclusion(false)}>
                    <th style={leftTableStyle}> Conclusion </th>
                    <th colSpan={2} onClick={() => setEditingConclusion(true)}> 
                        { !editingConclusion && <p className='subtitle is-4'> { conclusion.label } </p> }
                        { editingConclusion && <CreatableSelect isClearable value={conclusion} options={conclusions} onChange={editConclusion}/> }
                    </th>
                </tr>
            </thead>
        </table>
    </div>
}
