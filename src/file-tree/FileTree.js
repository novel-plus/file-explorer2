import { useEffect, useState } from "react";
import { useEvent } from "../utils/hooks";

function FileTreeTitle() {
    return <header className="file-tree-title">
        <h1>FileTree</h1>
    </header>
}

function FileTreeMenuFileItem({data}) {
    return <li>
        {data.name}
    </li>
}

function FileTreeMenuDirItem({data}) {
    return <li>
        {data.name}
        <FileTreeMenu data={data} />
    </li>
}

function FileTreeMenu({data}) {
    return <ul>
        {data.items.map((item) => {
            const isFile = (item.items === null);
            return isFile? 
                <FileTreeMenuFileItem data={item} /> :
                <FileTreeMenuDirItem data={item} />
        })}
    </ul>
}

const initialTreeData = {
    name: "",
    path: "",
    items: []
};

function FileTreeContainer() {    
    const [fileTreeData, setFileTreeData] = useEvent("file:dir-opened", initialTreeData, (result) => {
        if (!result.canceled) {
            setFileTreeData(result.content);
        }
    });
    return <section className="file-tree-container">
        <FileTreeTitle />
        <FileTreeMenu data={fileTreeData}/>
    </section>
}

export default FileTreeContainer;