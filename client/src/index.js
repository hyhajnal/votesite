import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
// model的state 构成全局的state
app.model(require('./models/users'));

app.model(require('./models/vote'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
