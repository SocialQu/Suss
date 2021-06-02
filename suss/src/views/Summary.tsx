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

const tdStyle:CSSProperties = { height:68, verticalAlign:'middle' }


export interface iSummary { 
    titles:OptionTypeBase[]
    topics:OptionTypeBase[][]
    notes:OptionTypeBase[][]
    conclusions:OptionTypeBase[] 
}

export const Summary = ({ titles, topics, notes, conclusions }: iSummary) => {
    const [ title, setTitle] = useState(titles[0])
    const [ editingTitle, setEditingTitle ] = useState(false)

    const [ conclusion, setConclusion] = useState(conclusions[0])
    const [ editingConclusion, setEditingConclusion ] = useState(false)

    const [ selectedTopics, setSelectedTopics ] = useState(topics.map(([t]) => t))
    const [ editingTopic, setEditingTopic ] = useState(-1)

    const [ selectedNotes, setSelectedNotes ] = useState(notes.map(([n]) => n))
    const [ editingNotes, setEditingNotes ] = useState(-1)

    const editTitle = (newTitle:OptionTypeBase|null) => {
        setTitle(newTitle || {label:''})
        if(newTitle) process.nextTick(() => setEditingTitle(false))
    }

    const editConclusion = (newConclusion:OptionTypeBase|null) => {
        setConclusion(newConclusion || {label:''})
        if(newConclusion) process.nextTick(() => setEditingConclusion(false))
    }

    const editTopic = (topic:OptionTypeBase|null, idx:number) => {
        if(idx === Infinity){
            const newTopics = [...selectedTopics, topic as OptionTypeBase]
            setSelectedTopics(newTopics)
            setEditingTopic(-1)
            return
        }


        const newTopics = topic 
            ? selectedTopics.map((t, i) => i===idx ? topic : t) 
            : selectedTopics.filter((t, i) => i !== idx)
        setSelectedTopics(newTopics)
        setEditingTopic(-1)
    }

    const editNotes = (note:OptionTypeBase|null, idx:number) => {
        const newNotes = note 
            ? selectedNotes.map((t, i) => i===idx ? note : t) 
            : selectedNotes.filter((t, i) => i !== idx)
        setSelectedNotes(newNotes)
        setEditingNotes(-1)
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

                { selectedTopics.map((topic, i, l) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={l.length + 1}> Topics </th> }
                        <td 
                            colSpan={2} 
                            onMouseEnter={() => setEditingTopic(i)} 
                            onMouseLeave={() => setEditingTopic(-1)}
                            style={{borderBottom:0}} 
                        >
                            { 
                                editingTopic !== i 
                                ?   `• ${topic.label}` 
                                :   <CreatableSelect 
                                        isClearable 
                                        options={topics[i]} 
                                        value={selectedTopics[i]} 
                                        onChange={(topic) => editTopic(topic, i)}
                                    /> 
                            }
                        </td>
                    </tr>
                )}
                <tr>
                    <td 
                        colSpan={2}
                        style={{borderBottom:'2px solid gray'}} 
                        onMouseLeave={() => setEditingTopic(-1)}
                        onMouseEnter={() => setEditingTopic(selectedTopics.length + 1)}
                    > 
                        { 
                            editingTopic !== selectedTopics.length + 1
                            ?   <a> Add Topic </a>
                            :   <CreatableSelect 
                                    onChange={(topic) => editTopic(topic, Infinity)}
                                    options={topics[selectedTopics.length + 1] || []} 
                                /> 
                        }
                    </td>
                </tr>

                { selectedNotes.map((note, i, l) => 
                    <tr key={i}>
                        { !i && <th style={leftTableStyle} rowSpan={l.length}> Notes </th> }
                        <td 
                            colSpan={2} 
                            onMouseEnter={() => setEditingNotes(i)} 
                            onMouseLeave={() => setEditingNotes(-1)}
                            style={{borderBottom:i !== (l.length - 1) ? '0px' : '2px solid gray'}} 
                        >
                            { 
                                editingNotes !== i 
                                ?   `• ${note.label}` 
                                :   <CreatableSelect
                                        isClearable 
                                        options={notes[i]} 
                                        value={selectedTopics[i]} 
                                        onChange={(note) => editNotes(note, i)}
                                    /> 
                            }
                        </td>
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
