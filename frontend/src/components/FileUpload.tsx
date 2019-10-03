import React, { createRef } from 'react'

const FileInput: React.FC = () => {
    const fileInput: React.RefObject<HTMLInputElement> = createRef()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        alert(`Selected file - ${fileInput.current.files[0].name}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="upload">
                Upload file:
                <input type="file" name="upload" ref={fileInput} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default FileInput
