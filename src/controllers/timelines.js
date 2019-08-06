import path from 'path';
import fs from 'fs';
import {ApiError, handleApiError} from '../util/logger/api';

export default ({TimelineModel, WardModel, cloudinary}) => {
    const getAllTimelineForWard = async (req, res) => {
        try {
            const {wardId} = req.params;
            const wardTimeline = await TimelineModel.findAll({where: {wardId}});
            if (wardTimeline.length === 0) {
                throw new ApiError('no timeline for ward', 'server');
            }
            return res.status(200).json({
                status: 'success',
                message: 'successfully retreived timeline for ward',
                data: wardTimeline,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const uploadImage = imagePath => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(imagePath, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const addNewTimelineForWard = async (req, res) => {
        try {
            const {wardId} = req.params;
            const ward = await WardModel.findOne({where: {id: wardId}});
            if (!ward) {
                throw new ApiError(
                    `ward with id ${wardId} does not exist`,
                    'notfound'
                );
            }
            const {description} = req.body;
            const {image} = req.files;
            if (!description) {
                throw new Error('Input the right paramters');
            }
            const imagePath = path.resolve(`./src/temp_images/${image.name}`);
            await image.mv(imagePath);
            const result = await uploadImage(imagePath);
            fs.unlink(imagePath, error => {
                if (error) throw new Error(error.message);
            });
            const newTimeline = await TimelineModel.create({
                imageUrl: result.secure_url,
                description,
                wardId,
            });
            return res.status(201).json({
                status: 'success',
                message: 'successfully created new timeline',
                data: newTimeline,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const updateTimelineEntryForWard = async (req, res) => {
        try {
            const {description} = req.body;
            const {id, wardId} = req.params;
            const timeline = await TimelineModel.findAll({where: {id, wardId}});
            if (!timeline) {
                throw new ApiError(
                    'user has no timeline or user does not exist',
                    'notfound'
                );
            }
            let imageUrl = timeline[0].dataValues.imageUrl;
            if (req.files !== null) {
                const {image} = req.files;
                const imagePath = path.resolve(
                    `./src/temp_images/${image.name}`
                );
                await image.mv(imagePath);
                const result = await uploadImage(imagePath);
                fs.unlink(imagePath, error => {
                    if (error) throw new Error(error.message);
                });
                imageUrl = result.secure_url;
            }
            const safeTimeline = {
                imageUrl,
                description: !description
                    ? timeline.dataValues.description
                    : req.body.description,
            };
            await TimelineModel.update(
                {
                    imageUrl: safeTimeline.imageUrl,
                    description: safeTimeline.description,
                },
                {where: {id}}
            );
            return res.status(201).json({
                status: 'success',
                message: 'successfully updated timeline',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const deleteSingleTimelineEntryForWard = async (req, res) => {
        try {
            const {id, wardId} = req.params;
            const timeline = await TimelineModel.findOne({where: {id, wardId}});
            if (!timeline) {
                throw new ApiError(`not timeline with id ${id}`, 'notfound');
            }
            await TimelineModel.destroy({where: {id}});
            return res.status(200).json({
                status: 'success',
                message: 'Resource deleted successfully',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    return {
        getAllTimelineForWard,
        addNewTimelineForWard,
        updateTimelineEntryForWard,
        deleteSingleTimelineEntryForWard,
    };
};
