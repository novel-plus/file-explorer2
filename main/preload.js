const { contextBridge, ipcMain, ipcRenderer } = require("electron");

function dispatchMainEvent(eventType, payload) {
    const event = new CustomEvent(eventType, {detail: payload});
    document.dispatchEvent(event);
}

contextBridge.exposeInMainWorld("fileApi", {
    openDir: () => ipcRenderer.invoke("file:open-dir")
})

ipcRenderer.on("file:dir-opened", (event, result) => {
    dispatchMainEvent('file:dir-opened', result);
})
