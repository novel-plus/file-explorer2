const { contextBridge, ipcMain, ipcRenderer } = require("electron");
const marked = require('marked');

function dispatchMainEvent(eventType, payload) {
    const event = new CustomEvent(eventType, {detail: payload});
    document.dispatchEvent(event);
}

contextBridge.exposeInMainWorld("fileApi", {
    openDir: () => ipcRenderer.send("file:open-dir"),
    readFile: (fileName) => ipcRenderer.send("file:read-file", fileName)
})

ipcRenderer.on("file:on-open-dir", (event) => {
    dispatchMainEvent("file:request-open-dir");
})

ipcRenderer.on("file:fin-open-dir", (event, result) => {
    dispatchMainEvent("file:fin-open-dir", result);
})

ipcRenderer.on("file:fin-read-file", (event, result) => {
    dispatchMainEvent("file:fin-read-file", result);
})

