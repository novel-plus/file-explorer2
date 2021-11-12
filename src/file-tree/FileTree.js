import { useState } from "react";

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
        <FileTreeMenu data={data.items} />
    </li>
}

function FileTreeMenu({data}) {
    return <ul>
        {data.items.map((item) => {
            const isFile = (item.items.length === 0);
            return isFile? 
                <FileTreeMenuFileItem data={item} /> :
                <FileTreeMenuDirItem data={item}/>
        })}
    </ul>
}

function FileTreeContainer() {
    const initialTreeData = {
        name: null,
        path: null,
        items: []
    };
    const testTreeData = {
        name: "test",
        items: [{
            name: "test-sub",
            items: []
        }, {
            name: "test-sub-dir",
            items: [{
                name: "test-sub-sub",
                items: []
            }, {
                name: "test-sub-sub2",
                items: []
            }]
        }]
    }
    const [fileTreeData, setFileTreeData] = useState(testTreeData)
    return <section className="file-tree-container">
        <FileTreeTitle />
        <FileTreeMenu data={fileTreeData}/>
    </section>
}

export default FileTreeContainer;