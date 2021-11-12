const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            defaultEncoding: "utf-8"
        }
    });
    mainWindow.loadFile(path.resolve(__dirname, "compile", "index.html"))
    return mainWindow;
}

app.whenReady().then(() => {
    createWindow();
})