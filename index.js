const express=require("express");
const cors=require("cors")
const app =(express())
require("dotenv").config();
const { MongoClient } = require("mongodb");
app.use(cors());

app.use(express.json());


const port=process.env.PORT||9000;

app.get('/',(req,res)=>{
  res.send('server running');

})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      console.log('connected');
      const database = client.db('volunteer');
      const servicescollection = database.collection('services');
      const userscollection = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
     


      app.get('/services',async (req,res)=>{

        const cursor=servicescollection.find({})
        const services=await cursor.toArray()

        res.json(services)

//skdfjsdkfjsdk/
      })

    
      app.post("/orders", async(req,res)=>{

              
      const data=req.body;
             const result= await userscollection.insertOne(data)
        
        res.json(result)
      
})
app.get('/orders',async(req,res)=>{
  const cursor=userscollection.find({})
  const users= await cursor.toArray()

  res.send(users)
})
      
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);



//dfslkfsdlfksopeislkdcldvjiojrsioeofdjvkdfhfghfghdfghfdteddcf


app.listen(port,()=>{
  console.log('connected on port',port);

})
  