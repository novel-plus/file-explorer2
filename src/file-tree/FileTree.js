import { useEffect, useState } from "react";

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
                <FileTreeMenuDirItem data={item}/>
        })}
    </ul>
}

function FileTreeContainer() {
    const initialTreeData = {
        name: null,
        path: null,
        items: null
    };
    const testTreeData = {
        name: "test",
        items: [{
            name: "test-sub",
            items: null
        }, {
            name: "test-sub-dir",
            items: [{
                name: "test-sub-sub",
                items: null
            }, {
                name: "test-sub-sub2",
                items: null
            }]
        }]
    }
    const [fileTreeData, setFileTreeData] = useState(testTreeData);
    useEffect(() => {
        document.addEventListener("file:dir-opened", (event)=>{
            const result = event.detail;
            if (!result.canceled){
                console.log(result.content);
                setFileTreeData(result.content);
            }
        });
    })
    return <section className="file-tree-container">
        <FileTreeTitle />
        <FileTreeMenu data={fileTreeData}/>
    </section>
}

export default FileTreeContainer;