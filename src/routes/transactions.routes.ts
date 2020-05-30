import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';

const fs = require('fs').promises;

const parse = require('csv-parse/lib/sync');

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();
  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const serviceTransaction = new CreateTransactionService();

  const transaction = await serviceTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteRepository = new DeleteTransactionService();

  await deleteRepository.execute(id);

  return response.status(204).send();
});

// transactionsRouter.post(
//   '/import',
//   upload.single('file'),
//   async (request, response) => {
//     const service = new ImportTransactionsService();

//     const { file } = request;

//     const content = await fs.readFile(`${file.path}`);

//     const records = parse(content);

//     service.execute(records);

//     return response.json({ ok: true });
//   },
// );

export default transactionsRouter;
