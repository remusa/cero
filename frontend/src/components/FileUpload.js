import React from 'react'

const FileInput = () => {
    const fileInput = React.createRef()

    const handleSubmit = e => {
        e.preventDefault()
        alert(`Selected file - ${fileInput.current.files[0].name}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label name='upload' htmlFor='upload'>
                Upload file:
                <input type='file' name='upload' ref={fileInput} />
            </label>
            <br />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default FileInput
