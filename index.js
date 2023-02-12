const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const compression = require("compression");

const ProductModel = require("./models/Product");
const userModel = require("./models/user");

app.use(express.json());
app.use(cors());



mongoose.connect(
  "mongodb+srv://teddybuddytoys:rishav@cluster0.pif1gua.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.use(compression());

app.get("/read", async (req, res) => {
  ProductModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.post("/add", async (req, res) => {
  const Name = req.body.name;
  const Price = req.body.price;
  const Status = req.body.status;
  const ImageStr = req.body.imageStr;

  const product = new ProductModel({
    name: Name,
    price: Price,
    status: Status,
    imageStr: ImageStr,
  });

  try {
    await product.save();
    res.send("Data Inserted");
  } catch (err) {
    console.log(err);
  }
});


app.delete('/delete/:id', (req, res) => {
  ProductModel.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


app.post('/user' ,(req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }, (err, User) => {
    if (User) {
      if (password === User.password) {
        res.send({ message: "Login Successfull", User: User });
      } else {
        res.send({ message: "Worng Password" });
      }
    } else {
      res.send({ message: "Worng Email & Password" });
    }
  });
});



// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("client/build"))
// }


app.listen(process.env.PORT || 5000, () => {
  console.log("server is running at port 5000...");
});
