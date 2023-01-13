// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { AutomateData } from './types';

contextBridge.exposeInMainWorld('electronAPI', {
    automate: (data: AutomateData) => ipcRenderer.send('automate', data)
})
