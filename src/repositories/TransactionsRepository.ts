import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private transactions: Transaction[];

  public async all(): Promise<Transaction[]> {
    const repository = getRepository(Transaction);

    const result = await repository.find();

    return result;
  }

  public async getBalance(): Promise<Balance> {
    const repository = getRepository(Transaction);

    this.transactions = await repository.find();

    const { income, outcome, total } = this.transactions.reduce(
      (accumalator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumalator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumalator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        return accumalator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
