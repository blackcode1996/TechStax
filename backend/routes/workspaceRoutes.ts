import express, { Request, Response } from 'express';
import { WorkspaceModel, Workspace } from '../model/workspaceModel';

const workspaceRouter = express.Router();

workspaceRouter.post('/', async (req: Request, res: Response) => {
    try {
        const workspaceData: Workspace = req.body;
        const newWorkspace = await WorkspaceModel.create(workspaceData);
        res.status(201).json(newWorkspace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

workspaceRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const workspaceId: number = parseInt(req.params.id);
        const updatedWorkspaceData: Workspace = req.body;

        const updatedWorkspace = await WorkspaceModel.findByIdAndUpdate(workspaceId, updatedWorkspaceData, { new: true });

        if (!updatedWorkspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        res.json(updatedWorkspace);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

workspaceRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const workspaceId: number = parseInt(req.params.id);
        const deletedWorkspace = await WorkspaceModel.findByIdAndDelete(workspaceId);

        if (!deletedWorkspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default workspaceRouter;
