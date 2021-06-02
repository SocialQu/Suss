import { CSSProperties } from "react"


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
    color: 'white',
    background: '#222',
    verticalAlign:'middle'
}

export const Summary = () => {

    return <div className='container' style={transcriptionStyle}>
        <p 
            className='title is-1 has-text-centered' 
            style={{marginBottom:'1em', color: 'goldenrod'}}
        > 
            Meeting Summary
        </p>

        <table className="table" style={tableStyle}>
            <thead>
                <tr>
                    <th style={leftTableStyle}> Title </th>
                    <th colSpan={2}> 
                        <p className='title is-3 has-text-centered'> Meeting Tittle </p>
                    </th>
                </tr>

                <tr>
                    <th style={leftTableStyle} rowSpan={4}> Topics </th>
                    <td colSpan={2} style={{borderWidth:0}}> • Topic A </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{borderWidth:0}}> • Topic B </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{borderWidth:0}}> • Topic C </td>
                </tr>
                <tr>
                    <td colSpan={2}> • Topic D </td>
                </tr>

                <tr>
                    <th style={leftTableStyle} rowSpan={4}> • Notes </th>
                    <td colSpan={2} style={{borderWidth:0}}> • Note A </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{borderWidth:0}}> • Note B </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{borderWidth:0}}> • Note C </td>
                </tr>
                <tr>
                    <td colSpan={2}> • Note D </td>
                </tr>

                <tr>
                    <th style={leftTableStyle}> Conclusion </th>
                    <th colSpan={2}> 
                        <p className='subtitle is-4'> Meeting Conclusion </p>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
}
