import SwaggerUi from 'swagger-ui-express';
import swaggerJsDocs from 'swagger-jsdoc';
import { PORT } from './config.js';
import { Router } from 'express';

const router = Router();

const swaggerDoc = swaggerJsDocs({
    swaggerDefinition: {
        openapi: '3.0.0',
        servers: [
            {
                url: `http://localhost:${PORT}`,
                desccription: 'events app api'
            }
        ],
        info: {
            version: '1.0.0',
            title: 'events teller app',
            description: 'events teller app with different facilities...'
        },
        components: {
            securitySchemes: {
                Bearer: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'token'
                }
            }
        }
    },
    apis: [
        `${process.cwd()}/src/swagger/components/*.yaml`,
        `${process.cwd()}/src/swagger/docs/*.yaml`
    ]
})

router.use('/', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc));

export default router;