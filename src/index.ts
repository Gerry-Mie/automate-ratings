import { app, BrowserWindow, ipcMain } from 'electron';
import webdriver from 'selenium-webdriver'
import * as process from 'process';
import fs from 'fs'
import * as path from 'path';
import { AutomateData } from './types';
import {execFile} from 'child_process'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import findChromeVersion from 'find-chrome-version'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = async () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 350,
        width: 450,
        resizable: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    mainWindow.menuBarVisible = false
    // and load the index.html of the app.
    await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // mainWindow.webContents.openDevTools()

    // driver ----------------------------------------------------------------------------------------

    let chromeVersion = await findChromeVersion()
     chromeVersion = chromeVersion.split('.')[0]

    const executablePath = path.join(process.cwd(), `resources/chromedriver/${chromeVersion}.exe`)
    execFile(executablePath,[], (error) => {
        if (error) {
            throw error;
        }
    })

    //  selenium -------------------------------------------------------------------------------------
    const driver = new webdriver.Builder()
        .usingServer('http://localhost:9515')
        .forBrowser('chrome')
        .build();

    ipcMain.on('automate', (event, data: AutomateData) => {

        const scriptPath = path.join(process.cwd(), 'resources/scripts/' + data.website + '.js')
        const script = fs.readFileSync(scriptPath, 'utf8')
        try {
            driver.get(data.url)
            driver.executeScript(script)
        }catch (e) {
            throw Error('Error: Maybe the automated browser is closed')
        }

    })
    //  selenium end -----------------------------------------------------------------------------------

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
