import React from 'react'
import { Sandpack, SandpackProvider ,SandpackCodeEditor,SandpackLayout} from "@codesandbox/sandpack-react";
import Constants from '@/data/Constants';
import {aquaBlue} from "@codesandbox/sandpack-themes";
function CodeEditor({codeResp,isReady}:any) {
  return (
    <div>
      {isReady?  <Sandpack template='react'
        theme={aquaBlue}
         options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          showNavigator:true,
          showTabs:true,
          editorHeight:640
        }}
        customSetup={{
        dependencies:{
        ...Constants.DEPENDANCY
        }
        }}
        files={{
          "/App.js":{
            code:`${codeResp}`,
            active:true
          },}}
        />:
        <SandpackProvider template='react'
        theme={aquaBlue}
        files={{
          "app.js":{
            code:`${codeResp}`,
            active:true
          }
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
         
        }}
        customSetup={{
        dependencies:{
        ...Constants.DEPENDANCY
        }
        }}
        >
         <SandpackLayout></SandpackLayout>
         <SandpackCodeEditor showTabs={true} style={{height:'70vh'}}></SandpackCodeEditor>

        </SandpackProvider>

}
    </div>
  
  
  )
}

export default CodeEditor