import { LoginSchema, RegisterSchema, SpeakerSchema, PostSchema } from '../utils/validation.js';

export default (req, res, next) => {
  try {
    if (req.url == '/login' && req.method == 'POST') {
      const { error } = LoginSchema.validate(req.body)
      if (error) throw Error(error)
    }
    if (req.url == '/register' && req.method == 'POST') {
      const { error } = RegisterSchema.validate(req.body);
      if (error) throw Error(error);
    }
    if (req.url == '/speakers' && req.method == 'POST') {
      const { error } = SpeakerSchema.validate(req.body);
      if (error) throw Error(error);
    }
    if (req.url == '/posts' && req.method == 'POST') {
      const { image } = req.files;
      const { error } = PostSchema.validate({ ...req.body, image: image.name, size: image.size});
      if (error) throw Error(error);
    }
    next()
  } catch (error) {
    return next(error)
  }
}