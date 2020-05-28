import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category | null> {
    const categoryRepository = getRepository(Category);

    let category = await categoryRepository.findOne({
      where: { title },
    });

    if (!category) {
      const result = categoryRepository.create({
        title,
      });

      await categoryRepository.save(result);

      category = await categoryRepository.findOne({
        where: { title },
      });
    }

    return category || null;
  }
}

export default CreateCategoryService;
