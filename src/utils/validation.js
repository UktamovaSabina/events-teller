import Joi from 'joi';

export const LoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const RegisterSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(32)
    .pattern(new RegExp('^[a-z0-9]{3,30}$'))
    .required(),
  password: Joi.string().min(8).max(100).required(),
});

export const SpeakerSchema = Joi.object({
  speaker_fullname: Joi.string()
    .max(45)
    .required(),
  speaker_prof: Joi.string().required(),
  phone_number: Joi.string()
    .max(13)
    .min(13)
    .pattern(new RegExp('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'))
    .required()
});

export const PostSchema = Joi.object({
  title: Joi.string().max(50).required(),
  desc: Joi.string().max(100).min(0),
  text: Joi.string().max(1000).min(0),
  image: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required(),
  size: Joi.number().max(10 * 1024 * 1024).error(new Error('image size incorrect')),
  sub_category_id: Joi.number().required(),
  speaker_id: Joi.number().required(),
  type: Joi.string(),
  status: Joi.string()
});