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
    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Invalid type, only income or outcome', 400);
    }

    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const category_name = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!category_name) {
      throw new AppError('Category not exists', 400);
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
