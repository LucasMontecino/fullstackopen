import { rollbackMigration } from './db';

rollbackMigration()
  .then((res) => console.log('Migrations rollback!', res))
  .catch((err) => console.log(err));
