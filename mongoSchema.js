/* const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
 */


Sure, I'd be happy to guide you through learning MongoDB with Node.js using Mongoose, which is a popular library for working with MongoDB in a more structured and user-friendly way. Let's start with the basics and gradually move to more advanced topics.

## Basic to Advanced Guide for Learning MongoDB with Node.js and Mongoose

### 1. Installation

Before you begin, make sure you have Node.js installed on your system. You can install Mongoose using npm (Node Package Manager) with the following command:

```bash
npm install mongoose
```

### 2. Connecting to MongoDB

To start working with MongoDB using Mongoose, you need to establish a connection to your MongoDB database. Here's how you do it:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database!');
});
```

Replace `'mongodb://localhost/mydatabase'` with the appropriate MongoDB connection string.

### 3. Defining a Schema

A schema defines the structure of your data. Let's say you're building a simple blog application. Here's how you define a schema for a blog post:

```javascript
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
```

### 4. Creating and Saving Documents

Now let's create a new blog post and save it to the database:

```javascript
const newPost = new BlogPost({
  title: 'Getting Started with MongoDB and Node.js',
  content: 'This is a tutorial on using MongoDB with Node.js and Mongoose.',
  author: 'John Doe'
});

newPost.save((err, savedPost) => {
  if (err) return console.error(err);
  console.log('New post saved:', savedPost);
});
```

### 5. Basic Queries

Here are some basic query examples:

- **Find all blog posts:**
  ```javascript
  BlogPost.find((err, posts) => {
    if (err) return console.error(err);
    console.log('All blog posts:', posts);
  });
  ```

- **Find a specific post by title:**
  ```javascript
  BlogPost.findOne({ title: 'Getting Started with MongoDB' }, (err, post) => {
    if (err) return console.error(err);
    console.log('Found post:', post);
  });
  ```

### 6. Advanced Queries and Operators

Here's an example of using operators in a query:

- **Find posts published by a specific author after a certain date:**
  ```javascript
  BlogPost.find({
    author: 'John Doe',
    date: { $gte: new Date('2023-01-01') }
  }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts by John Doe after 2023:', posts);
  });
  ```

### 7. Updating Documents

Let's update a blog post's content:

```javascript
BlogPost.findOneAndUpdate(
  { title: 'Getting Started with MongoDB' },
  { content: 'Updated content goes here.' },
  { new: true },
  (err, updatedPost) => {
    if (err) return console.error(err);
    console.log('Updated post:', updatedPost);
  }
);
```

### 8. Deleting Documents

And finally, let's delete a blog post:

```javascript
BlogPost.deleteOne({ title: 'Getting Started with MongoDB' }, err => {
  if (err) return console.error(err);
  console.log('Post deleted');
});
```

### Conclusion

This guide covers the basics of using MongoDB with Node.js and Mongoose. As you become more comfortable, you can explore more advanced features like indexing, aggregation, and embedding documents.

Remember, MongoDB's official documentation and Mongoose's documentation are excellent resources for further learning.

Always consider best practices for error handling, security, and performance when working with databases in your applications. Happy learning!

Certainly! Here are some more examples of complex queries using MongoDB's operators and Mongoose to help you practice:

### 1. Using Comparison Operators

- **Find posts with more than 1000 views:**
  ```javascript
  BlogPost.find({ views: { $gt: 1000 } }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts with more than 1000 views:', posts);
  });
  ```

- **Find posts published within a specific date range:**
  ```javascript
  BlogPost.find({
    date: {
      $gte: new Date('2023-01-01'),
      $lt: new Date('2023-07-01')
    }
  }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts published between Jan and Jun 2023:', posts);
  });
  ```

### 2. Using Logical Operators

- **Find posts by either John Doe or Jane Smith:**
  ```javascript
  BlogPost.find({
    $or: [{ author: 'John Doe' }, { author: 'Jane Smith' }]
  }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts by John Doe or Jane Smith:', posts);
  });
  ```

- **Find posts with more than 1000 views and published by John Doe:**
  ```javascript
  BlogPost.find({
    $and: [{ views: { $gt: 1000 } }, { author: 'John Doe' }]
  }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts with >1000 views by John Doe:', posts);
  });
  ```

### 3. Using Regular Expressions

- **Find posts with titles containing "MongoDB":**
  ```javascript
  BlogPost.find({ title: /MongoDB/ }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts with "MongoDB" in title:', posts);
  });
  ```

### 4. Using Array Operators

- **Find posts that have specific tags:**
  ```javascript
  BlogPost.find({ tags: { $in: ['tutorial', 'MongoDB'] } }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts with tags "tutorial" or "MongoDB":', posts);
  });
  ```

- **Find posts with a certain number of comments:**
  ```javascript
  BlogPost.find({ comments: { $size: 5 } }, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts with 5 comments:', posts);
  });
  ```

### 5. Using Aggregation

- **Calculate the average views for all posts:**
  ```javascript
  BlogPost.aggregate([
    {
      $group: {
        _id: null,
        avgViews: { $avg: '$views' }
      }
    }
  ], (err, result) => {
    if (err) return console.error(err);
    console.log('Average views:', result);
  });
  ```

- **Count the number of posts by each author:**
  ```javascript
  BlogPost.aggregate([
    {
      $group: {
        _id: '$author',
        postCount: { $sum: 1 }
      }
    }
  ], (err, result) => {
    if (err) return console.error(err);
    console.log('Post count by author:', result);
  });
  ```

These examples cover a range of complex queries you might encounter when working with MongoDB and Mongoose. Feel free to modify and experiment with these queries to deepen your understanding. Remember to consult the MongoDB documentation and Mongoose documentation for further details and explanations of different operators and query structures.