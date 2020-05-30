import { getConnection } from 'typeorm';
import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(records): Promise<Transaction[]> {
    try {
      records.splice(0, 1);

      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Transaction)
        .values(records)
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ImportTransactionsService;
