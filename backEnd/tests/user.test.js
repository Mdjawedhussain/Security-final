const UserSchema=require("../models/customerModel");


const mongoose = require('mongoose');




// use the new name of the database

const url = 'mongodb://localhost:27017/easy_news';

beforeAll(async () => {

    mongoose.connect(url, {

        useNewUrlParser: true,

        useUnifiedTopology: true
    }, err => {

        if (err) throw err;

        console.log('Connected to MongoDB!!!')

    });

});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('User Schema test anything', () => {
    // user registration

    it('Registering user', async () => {

        const user = {

            'username': 'akash',

            'email': 'aksah1123@gmail.com',

            'password': "akash"



        };

        const data = await UserSchema.create(user);

        expect(data.username).toEqual('jawed');

    });

});