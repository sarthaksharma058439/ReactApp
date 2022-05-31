import React, { Component } from 'react'
import Header from '../components/Header'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import Data from './Data';
export default class MainScreen extends Component {
  constructor(props){
      super(props)
      this.state = {
				filedata:``
      }
  }
  componentDidMount(){
  }
	checkselect = (e)=>{
		console.log(e.name)
		this.renderFile(e.name)
	}
	createTree = (node)=>{
		if(node.type == "file"){
			return <TreeItem nodeId={String(Math.random()*100)} key = {String(Math.random()*100)} label={node.name} onClick = {()=>this.checkselect(node)} />
		}
		return <TreeItem nodeId={String(Math.random()*100)} key = {String(Math.random()*100)} label={node.name}>
							{
								node.children.map((n,id)=>{
									return this.createTree(n)
								})
							}
						</TreeItem>
	}
  renderFile = (filepath)=>{
		fetch("http://127.0.0.1:5000/"+filepath).then(res=>{
			res.text().then(val=>{
				this.setState({filedata:val})
			})
		})
  }
  render() {
    return (
      <div className='flex flex-col h-screen'>
          <div>
              <Header />
          </div>
          <div className='flex flex-row h-full'>
              <div className='flex w-1/3 h-full'>
                <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                {	
									Data.map((node,idx)=>this.createTree(node,idx))
								}
                </TreeView>
              </div>


              <div className='flex w-2/3 bg-blue-100 h-full'>
                <AceEditor
                placeholder=""
                height='100vh'
                width='100%'
                theme="monokai"
                name="blah2"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.filedata}
                setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                }}/>
                        
              </div>
          </div>
      </div>
    )
  }
}
