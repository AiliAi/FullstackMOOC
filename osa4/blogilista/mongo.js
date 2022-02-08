const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
	console.log('give password as argument');
	// eslint-disable-next-line no-undef
	process.exit(1);
}

// eslint-disable-next-line no-undef
const username = process.env.USERNAME;
// eslint-disable-next-line no-undef
const password = process.argv[2];
// eslint-disable-next-line no-undef
const title = process.argv[3];
// eslint-disable-next-line no-undef
const author = process.argv[4];

const url =
    `mongodb+srv://MongoAiliAi:${password}@cluster0.01i8j.mongodb.net/phone-app?retryWrites=true&w=majority`;
mongoose.connect(url);


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })


const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
	title: title,
	author: author,
	url: "test",
    likes: 2
});

// eslint-disable-next-line no-undef
if (process.argv.length < 4) {
	Blog.find({}).then(result => {
		console.log('Phonebook');
		result.forEach(blogPost => {
			console.log(blogPost.title, blogPost.author, blogPost.url, blogPost.likes);
		});
		mongoose.connection.close();
	});
} else {
	blog.save().then(() => {
		console.log(`Added ${title} number ${author} to phonebook`);
		mongoose.connection.close();
	});
}