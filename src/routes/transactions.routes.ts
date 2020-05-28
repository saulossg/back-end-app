import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transaction = new TransactionsRepository();
  const transactions = await transaction.all();
  const balance = await transaction.getBalance();

  const result = {
    transactions,
    balance,
  };

  return response.json(result);
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body;
    const serviceTransaction = new CreateTransactionService();

    const transaction = await serviceTransaction.execute({
      title,
      value,
      type,
      category,
    });

    return response.json(transaction);
  } catch (err) {
    return response.json(err);
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteRepository = new DeleteTransactionService();

  await deleteRepository.execute({ id });

  return response.status(200).json({ message: 'Sucess' });
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
