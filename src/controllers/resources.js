import {ApiError, handleApiError} from '../util/logger/api';

export default ({ResourceModel}) => {
    const getAllResources = async (req, res) => {
        try {
            const resources = await ResourceModel.findAll();
            if (resources.length === 0) {
                throw new ApiError('No resources found', 'server');
            }
            res.status(200).json({
                status: 'success',
                message: 'resouces retrieved',
                data: resources,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const addToResources = async (req, res) => {
        try {
            const {type, description, quantity} = req.body;
            if (!type || !description || !quantity) {
                throw new ApiError('input the right paramters', 'server');
            }
            const resource = await ResourceModel.create({
                type,
                description,
                quantity,
            });
            res.status(201).json({
                status: 'success',
                message: 'created new resource successfully',
                data: resource,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const updateSingleResource = async (req, res) => {
        try {
            const {type, description, quantity} = req.body;
            const {id} = req.params;
            const resource = await ResourceModel.findOne({where: {id}});
            if (!resource) {
                throw new ApiError(`not resource with id ${id}`, 'notfound');
            }
            const safeResource = {
                type: !type ? resource.dataValues.type : req.body.type,
                description: !description
                    ? resource.dataValues.description
                    : req.body.description,
                quantity: !quantity
                    ? resource.dataValues.quantity
                    : Number(req.body.quantity),
            };
            await ResourceModel.update(
                {
                    type: safeResource.type,
                    quantity: safeResource.quantity,
                    description: safeResource.description,
                },
                {where: {id}}
            );
            return res.status(201).json({
                status: 'success',
                message: 'successfully update resource',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const deleteSingleResource = async (req, res) => {
        try {
            const {id} = req.params;
            const resource = await ResourceModel.findOne({where: {id}});
            if (!resource) {
                throw new ApiError(`not resource with id ${id}`, 'notfound');
            }
            await ResourceModel.destroy({where: {id}});
            return res.status(200).json({
                status: 'success',
                message: 'Resource deleted successfully',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    return {
        getAllResources,
        addToResources,
        updateSingleResource,
        deleteSingleResource,
    };
};
