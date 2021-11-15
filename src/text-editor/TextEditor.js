import { marked } from "marked";
import { useState } from "react";

function TextEditorTitle() {
    return <h1>TextEditor</h1>
}

function TextEditorRaw({raw}) {

}

function TextEditorRendered({raw}) {
    const rendered = marked.parse(raw);
    return <div dangerouslySetInnerHTML={{__html: rendered}}>
    </div>
}

function TextEditorMainContainer() {
    const [raw, setRaw] = useState("# hello hello");
    return <div>
        <TextEditorRaw raw={raw} />
        <TextEditorRendered raw={raw} />
    </div>
}

function TextEditorContainer() {
    return <section className="text-editor-container">
        <TextEditorTitle />
    </section>
}

export default TextEditorContainer;