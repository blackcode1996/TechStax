import React, { useEffect, useRef, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Workspace from "../../components/Workspace/Workspace";
import { useEdgesState, useNodesState, useReactFlow, addEdge } from "reactflow";
import { convertCSVtoJSON } from "../../Utils/csvUtils";

const Home = () => {
  const initialNodes = [
    {
      id: "0",
      type: "ResizableNode",
      data: { label: "Default" },
      position: { x: 0, y: 50 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const loadWorkspaceData = useCallback((workspaceName) => {
    const savedWorkspaceData = localStorage.getItem(workspaceName);
    if (savedWorkspaceData) {
      const parsedData = JSON.parse(savedWorkspaceData);
      setNodes(parsedData.nodes);
      setEdges(parsedData.edges);
    } else {
      setNodes(initialNodes);
      setEdges([]);
    }
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      loadWorkspaceData(selectedWorkspace.name);
    }
  }, [selectedWorkspace, loadWorkspaceData]);

  useEffect(() => {
    const workspaceKeys = Object.keys(localStorage).filter(key =>
      key.startsWith("Workspace")
    );
  
    if (workspaceKeys.length > 0) {
      const savedWorkspaces = workspaceKeys.map(key =>
        JSON.parse(localStorage.getItem(key))
      );
      setWorkspaces(savedWorkspaces);
      setSelectedWorkspace(savedWorkspaces[0]);
    } else {
      setWorkspaces([
        {
          id: 1,
          logo: "./src/assets/Calendar.png",
          name: "Workspace 1",
          nodes: initialNodes,
          edges: [],
        },
      ]);
      setSelectedWorkspace({
        id: 1,
        logo: "./src/assets/Calendar.png",
        name: "Workspace 1",
      });
    }
  }, []);
  

  const handleClickWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);

    const savedWorkspaceData = localStorage.getItem(workspace.name);
    if (savedWorkspaceData) {
      const parsedData = JSON.parse(savedWorkspaceData);
      setNodes(parsedData.nodes);
      setEdges(parsedData.edges);
    } else {
      setNodes(initialNodes);
      setEdges([]);
    }
  };

  const handleDeleteWorkspace = (id) => {
    const deletedWorkspace = workspaces.find(
      (workspace) => workspace.id === id
    );
    setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
    setSelectedWorkspace(workspaces[workspaces.length - 1]);
    localStorage.removeItem(deletedWorkspace.name);
  };

  const handleCreateWorkspace = () => {
    const newWorkspaceId = workspaces.length + 1;
    const newWorkspace = {
      id: newWorkspaceId,
      logo: "./src/assets/Calendar.png",
      name: `Workspace ${newWorkspaceId}`,
      data: initialNodes,
    };
    setWorkspaces([...workspaces, newWorkspace]);
    setSelectedWorkspace(newWorkspace);
  };

  const handleSave = () => {
    if (selectedWorkspace) {
      const workspaceToSave = {
        id: selectedWorkspace.id,
        logo: selectedWorkspace.logo,
        name: selectedWorkspace.name,
        nodes: nodes,
        edges: edges,
      };

      localStorage.setItem(
        selectedWorkspace.name,
        JSON.stringify(workspaceToSave)
      );
      alert("Data saved");
    } else {
      alert("No workspace selected");
    }
  };

  let id = 1;
  const getId = () => `${id++}`;
  const connectingNodeId = useRef(null);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
          type: "ResizableNode",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (type === "default") {
        const lowerCaseNodes = nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: node.data.label.toLowerCase(),
          },
        }));
        setNodes(lowerCaseNodes);
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
        alert("All nodes are now in lowercase");
      } else {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [nodes, reactFlowInstance]
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const jsonData = await convertCSVtoJSON(file);

      const newNodes = jsonData.map((data, index) => {
        const nodeId = getId();
        const nodes = [];
        const edges = [];

        Object.entries(data).forEach(([key, value]) => {
          const newNode = {
            id: `${nodeId}_${key}`,
            type: "ResizableNode",
            position: {
              x: 100 + Object.keys(data).indexOf(key) * 200,
              y: 100 + index * 100,
            },
            data: { label: value },
          };
          nodes.push(newNode);
          if (nodes.length > 1) {
            const edge = {
              id: getId(),
              source: nodes[nodes.length - 2].id,
              target: newNode.id,
            };

            edges.push(edge);
          }
        });

        setNodes((prevNodes) => [...prevNodes, ...nodes]);
        setEdges((prevEdges) => [...prevEdges, ...edges]);
      });
    } catch (error) {
      console.error("Error converting CSV to JSON:", error);
    }
  };

  const handleRestore = () => {
    setNodes(initialNodes);
    setEdges([]);
  };

  return (
    <div className="flex">
      <Sidebar
        workspaces={workspaces}
        selectedWorkspace={selectedWorkspace}
        handleDeleteWorkspace={handleDeleteWorkspace}
        handleCreateWorkspace={handleCreateWorkspace}
        handleClickWorkspace={handleClickWorkspace}
        handleSave={handleSave}
      />
      <div className="h-screen flex-1 p-5">
        {selectedWorkspace && (
          <Workspace
            name={selectedWorkspace.name}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            setReactFlowInstance={setReactFlowInstance}
            handleFileUpload={handleFileUpload}
            handleRestore={handleRestore}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
