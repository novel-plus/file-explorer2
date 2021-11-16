import { useEffect, useState } from "react";
import { useEvent } from "../utils/hooks";

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

function FileTreeMenuFileItem({data}) {
    return <li>
        <button onClick={() => window.fileApi?.readFile(data.path)}>{data.name}</button>
    </li>
}

function FileTreeMenuDirItem({data}) {
    return <li>
        {data.name}
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

function FileTreeContainer() {    
    const [fileTreeData, setFileTreeData] = useEvent("file:fin-open-dir", initialTreeData, (result) => {
        if (!result.canceled) {
            setFileTreeData(result.content);
        }
    });
    return <section className="file-tree-container">
        <FileTreeTitle />
        <FileTreeToolbar />
        <hr/>
        <FileTreeMenu data={fileTreeData}/>
    </section>
}

export default FileTreeContainer;