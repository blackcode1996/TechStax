import React, { useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  BackgroundVariant,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import ResizableNode from "../Nodes/ResizableNodeSelected";
import "./Workspace.css";

const Workspace = ({
  name,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onConnectStart,
  onConnectEnd,
  handleRestore,
  onDragStart,
  onDrop,
  onDragOver,
  setReactFlowInstance,
  handleFileUpload,
}) => {
  const nodeTypes = {
    ResizableNode,
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="workspace-title">{name}</h1>
        <div className="header-buttons">
          <button className="restore-button" onClick={handleRestore}>
            Restore
          </button>
          <button className="upload-button">
          <label htmlFor="file-upload">Upload CSV</label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </button>
        </div>
      </div>

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
        defaultEdgeOptions={{deletable:true}}
      >
        <Background variant={BackgroundVariant.Dots} />
        <MiniMap />
        <Controls />
      </ReactFlow>

      <aside>
        <div className="description">
          You can drag these nodes to the pane on the right.
        </div>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
          title="filter"
        >
          Filter Data
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
          title="post"
        >
          Send POST Request
        </div>
      </aside>
    </div>
  );
};

export default Workspace;
