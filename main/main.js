const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain } = require("electron");
const path = require("path");
const fileModule = require("./fileModule");

async function openDirectoryDialog({targetWindow, basePath=app.getPath('documents')}={}) {
    const result = {
        canceled: true,
        content: null
    };
    try {
        const dirSelect = await dialog.showOpenDialog(targetWindow, {
            title: "폴더를 선택해주세요",
            properties: ['openDirectory'],
            defaultPath: basePath,
            encoding: 'utf-8'
        });
        result.canceled = dirSelect.canceled;
        if (!dirSelect.canceled) {
            result.content = await fileModule.getDirectoryTree(dirSelect.filePaths[0]);
        }
    } catch (err) {
        result.canceled = true;
    } finally {
        return result;
    }
}

function createMenu() {
    const menu = new Menu();
    const isMac = process.platform === 'darwin';
    menu.append(new MenuItem({
        label: "파일",
        submenu: [{
            rule: "openFolder",
            label: "폴더 열기",
            accelerator: isMac? "Cmd+O" : "Ctrl+O",
            click: async () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                const result = await openDirectoryDialog({targetWindow: focusedWindow});
                focusedWindow.webContents.send("file:fin-open-dir", result)
            }
        }, {
            rule: "newFile",
            label: "새 파일",
            accelerator: isMac? "Cmd+N" : "Ctrl+N",
            click: () => {}
        }]
    }));
    menu.append(new MenuItem({
        label: "편집",
        submenu: [{
            role: "undo",
            label: "되돌리기",
            accelerator: isMac? "Cmd+Z" : "Ctrl+Z",
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                focusedWindow.webContents.undo();
            }
        }, {
            role: "redo",
            label: "다시하기",
            accelerator: isMac? "Cmd+Y" : "Ctrl+Y",
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                focusedWindow.webContents.redo();
            }
        }]
    }))
    return menu;
}

function createWindow({isDebug = false}) {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            defaultEncoding: "utf-8",
            preload: path.resolve(__dirname, "preload.js"),
        },
    });
    if (isDebug) mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.resolve(__dirname, "compile", "index.html"));
    return mainWindow;
}

function initializeWindow({isDebug=false} ={}) {
    const menu = createMenu();
    Menu.setApplicationMenu(menu);
    const mainWindow = createWindow({isDebug: isDebug});

    ipcMain.on("file:open-dir", async (event, dirName) => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        const result = await openDirectoryDialog({targetWindow: focusedWindow});
        event.senderFrame.send("file:fin-open-dir", result);
    })

    ipcMain.on("file:read-file", async (event, fileName) => {
        const content = await fileModule.getFileContent(fileName);
        event.senderFrame.send("file:fin-read-file", content);
    })
}

app.whenReady().then(() => {
    initializeWindow({isDebug: false});

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})
