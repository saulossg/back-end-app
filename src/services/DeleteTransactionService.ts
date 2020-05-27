// import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    try {
      const transaction = getRepository(Transaction);

      transaction.find();

      await transaction.delete({ id });
    } catch (Error) {
      console.error(Erro);
    }
  }
}

export default DeleteTransactionService;
