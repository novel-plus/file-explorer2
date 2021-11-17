import FileTreeWrapper from "./feature/file-tree/FileTree";
import TextEditorWrapper from "./feature/text-editor/TextEditor";

function App() {
    return <div className="app">
        <FileTreeWrapper />
        <TextEditorWrapper />
    </div>
}

export default App;