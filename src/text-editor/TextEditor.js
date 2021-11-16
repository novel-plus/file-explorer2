import { marked } from "marked";
import { useState } from "react";
import { useEvent } from "../utils/hooks";

function TextEditorTitle() {
    return <h1>TextEditor</h1>
}

function TextEditorRaw({content, setContent}) {
    return <textarea value={content}
        onChange={(event)=>{setContent(event.target.value)}} 
    />
}

function TextEditorRendered({content}) {
    const rendered = marked.parse(content);
    return <div dangerouslySetInnerHTML={{__html: rendered}}>
    </div>
}

function TextEditorMainContainer({content, setContent}) {
    return <div>
        <TextEditorRaw content={content} setContent={setContent} />
        <TextEditorRendered content={content} />
    </div>
}

function TextEditorContainer() {
    const [content, setContent] = useEvent("file:fin-read-file", "", (result) => {
        setContent(result.content);
    });

    return <section className="text-editor-container">
        <TextEditorTitle />
        <TextEditorMainContainer content={content} setContent={setContent}/>
    </section>
}

export default TextEditorContainer;