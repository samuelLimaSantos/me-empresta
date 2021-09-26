
import { app } from './app';

const port = 3333;

app.listen(process.env.PORT || port, () => {
  console.log(`Project is running😈!`);
});
