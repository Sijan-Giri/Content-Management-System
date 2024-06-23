const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    await mongoose.connect("mongodb+srv://girisijan346:sijan@cluster0.0uczuzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}