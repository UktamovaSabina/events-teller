import { read, write } from '../utils/model.js';
import { resolve } from "path";
import { unlinkSync } from "fs";
import { time, day } from '../utils/timeTeller.js';

const GET_ALL = (req, res) => {
    const posts = read("posts");

    res.status(200).json({
        status: 200,
        message: 'success',
        data: posts
    })
}

const GET_PUBLIC = (req, res) => {
    const posts = read("posts").filter(p => p.status == "confirmed");

    // pagination
    let { title, page, limit } = req.query;
    page = page || process.DEFAULT.pagination.page
    limit = limit || process.DEFAULT.pagination.limit

    const data = posts.filter(post => {
        const byTitle = title ? post.title.toLowerCase().includes(title.toLowerCase()) : true;
        return byTitle
      }).slice((page - 1) * limit, page * limit)

    res.status(200).json({
        status: 200,
        message: data.length > 0? `page ${page} is returned` : `no data is on page ${page}`,
        data: data
    })
}

const GET_SINGLE_POST = (req, res) => {
    try {
        const posts = read("posts");
        const speakers = read("speakers");
        const subCategories = read("subCategories");
        const categories = read("categories");

        const { id } = req.params;
        const post = posts.find(p => p.post_id == id);
        if (!post) {
            throw new Error('post is not found...')
        }
        //adding speaker's credentials
        post.speaker = speakers.find(s => s.speaker_id == post.speaker_id)
        delete post.speaker_id;

        //adding category and sub-category credentials
        post.category = subCategories.find(sub => {
            if (sub.sub_category_id == post.sub_category_id) {
                sub.category = categories.find(c => c.category_id == sub.category_id).category_name
                delete sub.category_id
                return sub
            }
        })
        delete post.sub_category_id;

        res.status(200).json({
            status: 200,
            message: 'success',
            data: post
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const POST = (req, res) => {
    try {
        const posts = read("posts");
        const subCategories = read("subCategories");
        const speakers = read("speakers");
        const { title, desc, text, sub_category_id, speaker_id, type, status } = req.body;
        const { image } = req.files;

        // validation => checking available sub_category_id
        const sub_category = subCategories.find(s => s.sub_category_id == sub_category_id)
        if (!sub_category) {
            throw new Error("enter existing sub_category_id || mavjud bo'lgan sub_category_id kiriting")
        }

        // validation 2 => checking available speaker_id
        const speaker = speakers.find(s => s.speaker_id == speaker_id)
        if (!speaker) {
            throw new Error("enter existing speaker_id || mavjud bo'lgan speaker_id kiriting")
        }

        const filePath = Date.now() + image.name.replace(/\s/g, '');

        //create post
        const newPost = {
            post_id: posts.at(-1)?.post_id + 1 || 1,
            title,
            desc,
            text,
            image: filePath,
            sub_category_id,
            speaker_id,
            type: type ? type : "online",
            status: status ? status : "pending",
            created_date: day,
            created_time: time
        }

        image.mv(resolve('uploads', filePath))
        posts.push(newPost);
        write('posts', posts)

        res.status(200).json({
            status: 200,
            message: 'success',
            data: newPost
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const PUT = (req, res) => {
    try {
        const posts = read("posts");
        const { id } = req.params;
        const { title, desc, text, type, status } = req.body;

        const post = posts.find(p => p.post_id == id);

        if (!post) {
            throw new Error("Post is not found...")
        }

        post.title = title || post.title;
        post.desc = desc || post.desc;
        post.text = text || post.text;
        post.type = type || post.type;
        post.status = status || post.status;

        write('posts', posts)
        res.status(200).json({
            status: 200,
            message: 'success',
            data: post
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

const DELETE = (req, res) => {
    try {
        const posts = read("posts");
        const { id } = req.params;
        const postIndex = posts.findIndex(p => p.post_id == id);

        if (postIndex == -1) {
            throw new Error("post is not found...")
        }

        const [deletedPost] = posts.splice(postIndex, 1);
        unlinkSync(resolve('uploads', deletedPost.image));

        write("posts", posts)
        res.status(200).json({
            status: 205,
            message: "successfully deleted",
            data: deletedPost
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export default {
    GET_ALL,
    GET_PUBLIC,
    GET_SINGLE_POST,
    POST,
    PUT,
    DELETE
}