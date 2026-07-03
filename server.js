var express = require('express');
const app = express();
app.get('/', (req, res)=>{
    res.send('backend running!!')
});

const notes= [
    {
        id:1,
        title: "this is title",
        description: "this is description"
    },
       {
        id:2,
        title: "this is notes title",
        description: "this is notes description"
    }
]
app.get('/api/notes', (req, res)=>{
    res.send(notes)
});

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`app is running on port  ${port}`);
})
