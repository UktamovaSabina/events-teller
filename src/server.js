import express from 'express';
import fileUpload from 'express-fileupload';
import { PORT } from './config.js';
import { resolve } from 'path';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';

import adminRouter from './routes/admin.router.js';
import categoryRouter from './routes/category.router.js';
import speakersRouter from './routes/speakers.router.js';
import postsRouter from './routes/posts.router.js';
import swaggerRouter from './swagger.js';

const app = express()
//essential middlewares
app.use(cors());
app.use(express.static(resolve('uploads')));
app.use(express.json());
app.use(fileUpload());

//swagger documentation
app.use('/api-docs', swaggerRouter);

//routers
app.use(adminRouter);
app.use(categoryRouter);
app.use(speakersRouter);
app.use(postsRouter);

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running in ${PORT}`))