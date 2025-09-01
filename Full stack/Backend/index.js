import express from 'express';

const app = express();

app.use(express.static('dist'));


// app.get('/', (req, res) => {
//   res.send('server is ready');

// });

app.get('/api/jokes',(req,res)=>{
  const jokes = [
    { id: 1 ,
      title: "A joke",
      content: "Why did the scarecrow win an award? Because he was outstanding in his field!"
    },
    {
      id: 2,
      title: "Another joke",
      content: "Why don't scientists trust atoms? Because they make up everything!"
    },
    {
      id: 3,
      title: "Yet another joke",
      content: "Why did the bicycle fall over? Because it was two-tired!"
    },
    {
      id: 4,
      title: "One more joke",
      content: "Why did the math book look sad? Because it had too many problems."
    },
    {
      id: 5,
      title: "Last joke",
      content: "Why don't programmers like nature? It has too many bugs."
    }
  ];
  res.send(jokes);
})

const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);

});
