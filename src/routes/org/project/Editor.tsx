import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  type NodeProps,
  BackgroundVariant,
  MiniMap
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export const Route = createFileRoute('/org/project/Editor')({
  component: EditorPage,
})

// Custom Blueprint-style Nodes
const nodeStyles = {
  container: "flex flex-col min-w-[200px] rounded-md overflow-hidden bg-[#151515] border border-[#2a2a2a] shadow-lg text-xs font-sans",
  header: "flex items-center px-3 py-1.5 font-bold text-white",
  body: "p-2 space-y-2 relative",
  handleLeft: "w-3 h-3 bg-white border-2 border-[#151515] -ml-[6px]",
  handleRight: "w-3 h-3 bg-white border-2 border-[#151515] -mr-[6px]",
}

function EventNode({ data }: NodeProps) {
  return (
    <div className={nodeStyles.container}>
      <div className={`${nodeStyles.header} bg-red-600/80`}>
        <span>Event: {data.label as string}</span>
      </div>
      <div className={nodeStyles.body}>
        <div className="flex justify-end items-center h-4">
          <span className="text-gray-400 mr-2">Exec</span>
          <Handle type="source" position={Position.Right} id="exec" className={nodeStyles.handleRight} />
        </div>
      </div>
    </div>
  )
}

function DialogueNode({ data }: NodeProps) {
  return (
    <div className={nodeStyles.container}>
      <div className={`${nodeStyles.header} bg-purple-600/80`}>
        <span>Dialogue</span>
      </div>
      <div className={nodeStyles.body}>
        <Handle type="target" position={Position.Left} id="exec-in" className={nodeStyles.handleLeft} />
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-4">
            <span className="text-gray-400 ml-2">Exec</span>
            <span className="text-gray-400 mr-2">Out</span>
            <Handle type="source" position={Position.Right} id="exec-out" className={nodeStyles.handleRight} />
          </div>
          <div className="bg-[#222] p-2 rounded text-gray-300 italic mt-1">
            "{data.text as string}"
          </div>
          {(data.choices as string[])?.map((choice, i) => (
            <div key={i} className="flex justify-end items-center h-4 mt-2">
              <span className="text-gray-400 mr-2">{choice}</span>
              <Handle type="source" position={Position.Right} id={`choice-${i}`} className={nodeStyles.handleRight} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConditionNode({ data }: NodeProps) {
  return (
    <div className={nodeStyles.container}>
      <div className={`${nodeStyles.header} bg-green-600/80`}>
        <span>Branch</span>
      </div>
      <div className={nodeStyles.body}>
        <Handle type="target" position={Position.Left} id="exec-in" className={nodeStyles.handleLeft} />
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between items-center h-4">
            <span className="text-gray-400 ml-2">Exec</span>
          </div>
          <div className="text-gray-300 py-1 border-y border-[#333] my-1 text-center font-medium">
            Condition: {data.condition as string}
          </div>
          <div className="flex justify-end items-center h-4">
            <span className="text-gray-400 mr-2">True</span>
            <Handle type="source" position={Position.Right} id="true" className={nodeStyles.handleRight} style={{ top: 'auto', bottom: 25 }} />
          </div>
          <div className="flex justify-end items-center h-4">
            <span className="text-gray-400 mr-2">False</span>
            <Handle type="source" position={Position.Right} id="false" className={nodeStyles.handleRight} style={{ top: 'auto', bottom: 5 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const nodeTypes = {
  event: EventNode,
  dialogue: DialogueNode,
  condition: ConditionNode,
}

const initialNodes = [
  {
    id: '1',
    type: 'event',
    position: { x: 50, y: 150 },
    data: { label: 'Player Enters Tavern' },
  },
  {
    id: '2',
    type: 'condition',
    position: { x: 350, y: 150 },
    data: { condition: 'Has Sword?' },
  },
  {
    id: '3',
    type: 'dialogue',
    position: { x: 650, y: 50 },
    data: { 
      text: "Ah, a fine blade! Welcome back.",
      choices: ["Ask for a drink", "Leave"] 
    },
  },
  {
    id: '4',
    type: 'dialogue',
    position: { x: 650, y: 300 },
    data: { 
      text: "We don't serve unarmed folk here.",
      choices: ["Bribe (50g)", "Walk away"] 
    },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'exec', targetHandle: 'exec-in', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#fff' } },
  { id: 'e2-3', source: '2', target: '3', sourceHandle: 'true', targetHandle: 'exec-in', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#fff' } },
  { id: 'e2-4', source: '2', target: '4', sourceHandle: 'false', targetHandle: 'exec-in', type: 'smoothstep', style: { strokeWidth: 2, stroke: '#fff' } },
]

function EditorPage() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', style: { strokeWidth: 2, stroke: '#fff' } }, eds)),
    [],
  )

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-border/50">
        <h2 className="text-lg font-semibold">Tavern Intro Sequence</h2>
        <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
          Unsaved Changes
        </div>
      </div>
      <div className="flex-1 w-full bg-[#0a0a0a]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          colorMode="dark"
        >
          <Background variant={BackgroundVariant.Cross} gap={24} size={2} color="#222" />
          <Controls className="bg-card border-border fill-foreground" />
          <MiniMap 
            nodeColor={(n) => {
              if (n.type === 'event') return '#dc2626';
              if (n.type === 'condition') return '#16a34a';
              return '#9333ea';
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
            className="bg-[#151515] border border-[#2a2a2a]"
          />
        </ReactFlow>
      </div>
    </div>
  )
}
