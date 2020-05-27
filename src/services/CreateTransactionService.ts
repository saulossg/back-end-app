import { getRepository } from 'typeorm';
import { uuid } from 'uuidv4';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    let category_name = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!category_name) {
      const result = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(result);

      category_name = await categoryRepository.findOne({
        where: { title: category },
      });
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: category_name.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
