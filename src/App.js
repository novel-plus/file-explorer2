import FileTree from "./file-tree/FileTree";
import TextEditor from "./text-editor/TextEditor";
import './style.css';

function App() {
    return <div className="app">
        <FileTree />
        <TextEditor />
    </div>
}

export default App;