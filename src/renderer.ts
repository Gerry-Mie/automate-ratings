/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { AutomateData } from './types';

export interface IElectronAPI {
    automate: (data: AutomateData) => void,
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

import './index.css';


const form  = document.getElementById('app-form')
const input = <HTMLInputElement> document.getElementById('input')
const select = <HTMLSelectElement> document.getElementById('select')
const button = document.getElementById('button')

form.addEventListener('submit', function (e){
    e.preventDefault()

    const url = input.value
    const website = select.value

    window.electronAPI.automate({url, website})
    button.style.marginTop = '32px'
    setTimeout(()=>button.style.marginTop = '30px', 100)
})

