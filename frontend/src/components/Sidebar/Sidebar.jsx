import React, { useState } from "react";

const Sidebar = ({
  workspaces,
  selectedWorkspace,
  handleDeleteWorkspace,
  handleCreateWorkspace,
  handleClickWorkspace,
  handleSave
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Work Flow
          </h1>
        </div>
        {/* Toggle Button */}
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        {/* Workspace List */}
        <ul className="pt-6">
          {workspaces.map((workspace) => (
            <div key={workspace.id}>
              <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                  !open && "mt-2"
                } ${selectedWorkspace && selectedWorkspace.id === workspace.id ? 'bg-light-white' : ''}`}
                onClick={() => handleClickWorkspace(workspace)}
              >
                <span>
                  <img src={workspace.logo} alt="logo" />
                </span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {workspace.name}
                </span>
                <button
                  className={`text-green-500 ml-auto ${!open && "hidden"}`}
                  onClick={handleSave}
                  title="Save"
                >
                  Save
                </button>
                <button
                  className={`text-red-500 ml-auto ${!open && "hidden"}`}
                  onClick={() => handleDeleteWorkspace(workspace.id)}
                  title="Delete"
                >
                  Delete
                </button>
              </li>
            </div>
          ))}
        </ul>
        {/* Create Workspace Button */}
        <button
          className={`flex justify-center m-auto mt-8 rounded-md p-4 cursor-pointer bg-light-white text-gray-300 text-sm items-center ${
            !open && "hidden"
          }`}
          onClick={handleCreateWorkspace}
        >
          Create New Workspace
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
