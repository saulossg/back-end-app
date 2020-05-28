import { Router } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';

const categoryRouter = Router();

categoryRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const serviceCategory = new CreateCategoryService();

  const category = await serviceCategory.execute({ title });

  return response.json(category);
});

export default categoryRouter;
