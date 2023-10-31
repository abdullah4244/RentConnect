import app from './src/app';

app.listen(process.env.PORT, () => {
    console.log('Listening on Port', process.env.PORT); // eslint-disable-line
});
