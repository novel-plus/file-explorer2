import { useEffect, useRef, useState } from "react";
import Resizer from "../../components/Resizer";
import { useEvent } from "../../utils/hooks";
import "./style.css"

function FileTreeTitle() {
    return <header className="file-tree-title">
        <h1>FileTree</h1>
    </header>
}

function FileTreeToolbar() {
    return <div>
        <button onClick={window.fileApi?.openDir}>폴더 열기</button>
    </div>
}

/* file tree entries */
function FileTreeEntryText({children}) {
    return <span className="file-tree-entry-text">{children}</span>
} 

function FileTreeMenuFileItem({data}) {
    return <li>
        <a onClick={(e) => {
            e.preventDefault();
            window.fileApi?.readFile(data.path)}}>
                <FileTreeEntryText>{data.name}</FileTreeEntryText>
        </a>
    </li>
}

function FileTreeMenuDirItem({data}) {
    return <li>
        <FileTreeEntryText>{data.name}</FileTreeEntryText>
        <ul>
            {data.items.map((item) => {
                const isFile = (item.items === null);
                return isFile? 
                    <FileTreeMenuFileItem data={item} /> :
                    <FileTreeMenuDirItem data={item} />
            })}
        </ul>
    </li>
}

function FileTreeMenu({data}) {
    return <ul>
        {data.path ? <FileTreeMenuDirItem data={data}/> : null }
    </ul>
}

const initialTreeData = {
    name: "",
    path: null,
    items: null
};

function FileTree() {
    const [fileTreeData, setFileTreeData] = useEvent("file:fin-open-dir", initialTreeData, (result) => {
        if (!result.canceled) {
            setFileTreeData(result.content);
        }
    });
    return <div className="file-tree">
        <FileTreeTitle />
        <FileTreeToolbar />
        <hr/>
        <FileTreeMenu data={fileTreeData}/>
    </div>
}

function FileTreeWrapper() {
    const fileTreeContainerRef = useRef(null);
    const [width, setWidth] = useState(100);
    return <section className="file-tree-wrapper" ref={fileTreeContainerRef} style={{width:width}}>
        <FileTree />
        <Resizer sidebarRef={fileTreeContainerRef} setWidth={setWidth}/>
    </section>
}

export default FileTreeWrapper;