import React from 'react'

import './App.css';
import SplitPane from 'react-split-pane'

const App = () => (
  <div>
    <h2>Home</h2>
    <SplitPane split="vertical" minSize={10} defaultSize={150}>
        <div style={{backgroundColor: 'palegreen'}}>
          <ul>
            <li>Users</li>
            <li>Transactions</li>
            <li>Employees</li>
          </ul>
        </div>
        <SplitPane split="horizontal" minSize={10} defaultSize={150}>
            <div style={{backgroundColor: 'lavender'}}>
              <div>
                <h2>Search Criteria</h2>
              </div>
              <div>
                <h2>Search Results</h2>
              </div>
            </div>
            <div style={{backgroundColor: 'mediumaquamarine'}}>
              <SplitPane split="vertical" minSize={150} defaultSize={550}>
                 <div style={{backgroundColor: 'lightcyan'}}>
                   words are wind
                 </div>
                 <div style={{backgroundColor: 'oldlace'}}>
                   she said
                 </div>
             </SplitPane>
            </div>
        </SplitPane>
    </SplitPane>
  </div>
)

export default App