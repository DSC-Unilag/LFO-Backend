import path from 'path';
import fs from 'fs';
import {ApiError, handleApiError} from '../util/logger/api';

export default ({WardModel, MedicalModel, cloudinary}) => {
    const getAllWards = async (req, res) => {
        try {
            const wards = await WardModel.findAll();
            if (!wards) {
                throw new ApiError('Failed to get Wards', 'server');
            }
            return res.status(200).json({
                status: 'success',
                message: 'Wards Retrieved',
                data: wards,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const getSingleWard = async (req, res) => {
        try {
            const {id} = req.params;
            const ward = await WardModel.findOne({where: {id}});
            if (!ward) {
                throw new ApiError(`Ward with Id ${id} not found`, 'notfound');
            }
            return res.status(200).json({
                status: 'success',
                message: 'Ward Retrieved',
                data: ward,
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const updateAdoptionStatus = async (req, res) => {
        try {
            const {id} = req.params;
            const ward = await WardModel.findOne({where: {id}});
            if (!ward) {
                throw new ApiError(
                    `Ward with Id ${id} does not exist`,
                    'notfound'
                );
            }
            await ward.update({adopted: true}, {where: {id}});
            return res.status(200).json({
                status: 'success',
                message: 'Adoption Status Updated',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const deleteWard = async (req, res) => {
        try {
            const {id} = req.params;
            const ward = await WardModel.findOne({where: {id}});
            if (!ward) {
                throw new ApiError(
                    `Ward with Id ${id} does not exist`,
                    'notfound'
                );
            }
            await WardModel.destroy({where: {id}});
            return res.status(200).json({
                status: 'success',
                message: 'Ward Deleted',
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    const getAdoptedWards = async (req, res) => {
        try {
            let wards = await WardModel.findAll({where: {adopted: true}});
            return res.status(200).json({
                status: 'success',
                message: 'Adopted Wards Retrived',
                data: wards,
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

    const addWard = async (req, res) => {
        try {
            const {
                name,
                age,
                school,
                origin,
                date_admitted,
                height,
                weight,
                blood_group,
                genotype,
                adopted,
            } = req.body;
            const {image} = req.files;
            const imagePath = path.resolve(`./src/temp_images/${image.name}`);
            await image.mv(imagePath);
            const result = await uploadImage(imagePath);
            fs.unlink(imagePath, error => {
                if (error) throw new Error(error.message);
            });
            const ward = await WardModel.create({
                name,
                age,
                school,
                adopted: eval(adopted),
                imageUrl: result.secure_url,
                origin,
                date_admitted: new Date(date_admitted).toDateString(),
            });
            const medical = await MedicalModel.create({
                height,
                weight,
                blood_group,
                genotype,
                wardId: ward.id,
            });
            return res.status(201).json({
                status: 'success',
                message: 'Ward Created',
                data: {...ward.dataValues, ...medical.dataValues},
            });
        } catch (error) {
            return handleApiError(res, error);
        }
    };

    return {
        getAllWards,
        getSingleWard,
        updateAdoptionStatus,
        deleteWard,
        getAdoptedWards,
        addWard,
    };
};
